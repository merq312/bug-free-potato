const path = require("path")
// const crypto = require("crypto").webcrypto;
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const onlineUsers = {}

const addUser = (socketId) => {
  return {
    [socketId]: "Guest" + Math.floor(Math.random() * 10000),
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

  // JOIN GLOBAL ROOM
  socket.join("Global")

  // ADD NEW USER TO SERVER-SIDE USER-LIST
  Object.assign(onlineUsers, addUser(socket.id))

  // SEND A RANDOM NAME AND USER-ID TO NEW USER (THE USER-ID IS A SECRET)
  socket.emit("guest name and id", onlineUsers[socket.id], socket.id)

  // SEND LIST OF OTHER USERS (NAMES ONLY)
  io.emit("user list", Object.values(onlineUsers))

  socket.on("chat message", (socketId, messageContent, roomName) => {
    // IF THE ROOM-NAME IS NOT "GLOBAL", FIND THE ROOM-ID FROM THE ROOM-NAME
    if (roomName !== "Global") {
      const roomId = Object.keys(onlineUsers).find(key => onlineUsers[key] === roomName);
      socket.to(roomId).emit("chat message", onlineUsers[socketId], messageContent, onlineUsers[socketId])
    } else {
      socket.to(roomName).emit("chat message", onlineUsers[socketId], messageContent, roomName)
    }
  })

  socket.on("set user name", (userName) => {
    onlineUsers[socket.id] = userName
    io.emit("user list", Object.values(onlineUsers))
  })

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("user disconnected")
    delete onlineUsers[socket.id]
    io.emit("user list", Object.values(onlineUsers))
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log("listening on *:" + port)
})
server.on("error", console.error)
