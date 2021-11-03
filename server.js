const path = require("path")
// const crypto = require("crypto").webcrypto;
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const onlineUsers = {}

const addUser = (id) => {
  return {
    [id]: "Guest" + Math.floor(Math.random() * 10000),
  }
}

app.use(express.static(path.join(__dirname, "client/build")))

app.get("*", (req, res) => {
  const filePath = path.join(__dirname + "/client/build", "index.html")
  res.sendFile(filePath)
})

io.on("connection", (socket) => {
  console.log(
    `a user connected: client id (${socket.id}) client ip (${socket.handshake.address})`
  )

  Object.assign(onlineUsers, addUser(socket.id))
  socket.emit("guest name", onlineUsers[socket.id])
  io.emit("user list", Object.values(onlineUsers))

  socket.on("disconnect", () => {
    console.log("user disconnected")
    delete onlineUsers[socket.id]
    io.emit("user list", Object.values(onlineUsers))
  })
})

io.on("connection", (socket) => {
  socket.on("chat message", (userName, messageContent) => {
    socket.broadcast.emit("chat message", userName, messageContent)
  })

  socket.on("set user name", (userName) => {
    onlineUsers[socket.id] = userName
    io.emit("user list", Object.values(onlineUsers))
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log("listening on *:" + port)
})
