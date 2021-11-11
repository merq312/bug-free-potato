const path = require("path")
const { v4: uuidv4 } = require('uuid');
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const onlineUsers = {}

const addUser = (socketId) => {
  return {
    [socketId]: {
      userName: "Guest" + Math.floor(Math.random() * 10000),
      uuid: uuidv4()
    },
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

  // SEND A RANDOM GENERATED NAME, UNIQUE-USER-ID AND SOCKET-ID
  socket.emit("user info", onlineUsers[socket.id], socket.id)

  // SEND LIST OF OTHER USERS (USERNAME AND UUID ONLY, SOCKET-ID IS HIDDEN)
  io.emit("user list", Object.values(onlineUsers))

  socket.on("chat message", (socketId, messageContent, roomName) => {
    // IF THE ROOM-NAME IS NOT "GLOBAL", FIND THE ROOM-ID FROM THE ROOM-NAME
    if (roomName !== "Global") {
      const roomId = Object.keys(onlineUsers).find(key => onlineUsers[key].uuid === roomName);
      socket.to(roomId).emit("chat message", onlineUsers[socketId].userName, messageContent, onlineUsers[socketId].uuid)
    } else {
      socket.to(roomName).emit("chat message", onlineUsers[socketId].userName, messageContent, roomName)
    }
  })

  socket.on("set user name", (userName) => {
    onlineUsers[socket.id].userName = userName
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
