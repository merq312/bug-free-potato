use std::sync::{
    Arc,
    atomic::{AtomicUsize, Ordering},
};
use std::time::{Duration, Instant};

use actix::*;
use actix_files as fs;
use actix_web::{App, Error, HttpRequest, HttpResponse, HttpServer, Responder, web};
use actix_web_actors::ws;

mod server;

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

async fn chat_route(
    req: HttpRequest,
    stream: web::Payload,
    srv: web::Data<Addr<server::ChatServer>>, ) -> Result<HttpResponse, Error> {
    ws::start(
        WsChatSession {
            id: 0,
            hb: Instant::now(),
            room: "Main".to_owned(),
            name: None,
            addr: srv.get_ref().clone(),
        },
        &req,
        stream,
    )
}

async fn get_count(count: web::Data<Arc<AtomicUsize>>) -> impl Responder {
    let current_count = count.fetch_add(1, Ordering::SeqCst);
    format!("Visitors: {}", current_count)
}

struct WsChatSession {
    id: usize,
    hb: Instant,
    room: String,
    name: Option<String>,
    addr: Addr<server::ChatServer>,
}

impl Actor for WsChatSession {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.hb(ctx);

        let addr = ctx.address();
        self.addr
            .send(server::Connect {
                addr: addr.recipient(),
            })
            .into_actor(self)
            .then(|res, act, ctx| {
                match res {
                    Ok(res) => act.id = res,
                    _ => ctx.stop(),
                }
                fut::ready(())
            }).wait(ctx);
    }

    fn stopping(&mut self, _: &mut Self::Context) -> Running {
        self.addr.do_send(server::Disconnect { id: self.id });
        Running::Stop
    }
}

impl Handler<server::Message> for WsChatSession {
    type Result = ();

    fn handle(&mut self, msg: server::Message, ctx: &mut Self::Context) {
        ctx.text(msg.0)
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WsChatSession {
    fn handle(
        &mut self,
        msg: Result<ws::Message, ws::ProtocolError>,
        ctx: &mut Self::Context,
    ) {
        let msg = match msg {
            Err(_) => {
                ctx.stop();
                return;
            }
            Ok(msg) => msg,
        };

        println!("WEBSOCKET MESSAGE: {:?}", msg);
        match msg {
            ws::Message::Ping(msg) => {
                self.hb = Instant::now();
                ctx.pong(&msg);
            }
            ws::Message::Pong(_) => {
                self.hb = Instant::now();
            }
            ws::Message::Text(text) => {
                let m = text.trim();

                if m.starts_with('/') {
                    let v: Vec<&str> = m.splitn(2, ' ').collect();
                    match v[0] {
                        "/list" => {
                            println!("List rooms");
                            self.addr
                                .send(server::ListRooms)
                                .into_actor(self)
                                .then(|res, _, ctx| {
                                    match res {
                                        Ok(rooms) => {
                                            for room in rooms {
                                                ctx.text(room);
                                            }
                                        }
                                        _ => println!("Something is wrong"),
                                    }
                                    fut::ready(())
                                })
                                .wait(ctx)
                        }
                        "/join" => {
                            if v.len() == 2 {
                                self.room = v[1].to_owned();
                                self.addr.do_send(server::Join {
                                    id: self.id,
                                    name: self.room.clone(),
                                });

                                ctx.text("joined");
                            } else {
                                ctx.text("!!! room name is required");
                            }
                        }
                        "/name" => {
                            if v.len() == 2 {
                                self.name = Some(v[1].to_owned());
                            } else {
                                ctx.text("!!! name is required");
                            }
                        }
                        _ => ctx.text(format!("!!! unknown command: {:?}", m)),
                    }
                } else {
                    let msg = if let Some(ref name) = self.name {
                        format!("{}: {}", name, m)
                    } else {
                        m.to_owned()
                    };

                    self.addr.do_send(server::ClientMessage {
                        id: self.id,
                        msg,
                        room: self.room.clone(),
                    })
                }
            }
            ws::Message::Binary(_) => println!("Unexpected binary"),
            ws::Message::Close(reason) => {
                ctx.close(reason);
                ctx.stop();
            }
            ws::Message::Continuation(_) => {
                ctx.stop();
            }
            ws::Message::Nop => (),
        }
    }
}

impl WsChatSession {
    fn hb(&self, ctx: &mut ws::WebsocketContext<Self>) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT {
                println!("Websocket Client heartbeat failed, disconnecting!");

                act.addr.do_send(server::Disconnect { id: act.id });

                ctx.stop();

                // don't try to send a ping
                return;
            }
            ctx.ping(b"");
        });
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let app_state = Arc::new(AtomicUsize::new(0));

    let server = server::ChatServer::new(app_state.clone()).start();

    HttpServer::new(move || {
        App::new()
            .data(app_state.clone())
            .data(server.clone())
            .service(web::resource("/").route(web::get().to(|| {
                HttpResponse::Found()
                    .header("LOCATION", "./static/websocket.html")
                    .finish()
            })))
            .route("/count/", web::get().to(get_count))
            // websocket
            .service(web::resource("/ws/").to(chat_route))
            // static resources
            .service(fs::Files::new("/static/", "static/"))
        // .service(fs::Files::new("/", "./client/build/")
        //     .index_file("index.html"))
    })
        .bind("127.0.0.1:3000")?
        .run()
        .await
}
