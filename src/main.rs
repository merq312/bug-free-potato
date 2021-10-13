use actix_files as fs;
use actix_web::{App, get, HttpResponse, HttpServer, post, Responder, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(fs::Files::new("/", "./client/build/").index_file("index.html"))
    })
        .bind("127.0.0.1:3000")?
        .run()
        .await
}
