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
  socket.emit("guestName", onlineUsers[socket.id])

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg)
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log("listening on *:" + port)
})

// TODO
// DONE Dont send the same message to the user that send it
// DONE Show nickname / guest number
// Show list of online members
// Add private messaging
// Add rooms
// Redis for memcache
// Wireup a database to store messages
