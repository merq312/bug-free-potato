import http from "http";
import express from "express";
import {Server, Socket} from "socket.io";
import {v4 as uuid} from "uuid";
import FixedSizeArray from "./fixed-size-array";

export const app = express()
export const server = http.createServer(app)
const io = new Server(server)

interface IMClientUser {
  userName: string
  uuid: string
}

interface Message {
  userName: string,
  content: string,
}

const onlineUsers: Record<string, IMClientUser> = {}
const globalMessages = FixedSizeArray<Message>(100)

io.on("connection", (socket) => {
  console.log(
    `a user connected: client id (${socket.id}) client ip (${socket.handshake.address})`
  )

  socket.join("Global")

  for (const message of globalMessages) {
    if (message) socket.emit("chat message", message.userName, message.content, "Global")
  }

  addNewUser(socket);
  sendUserInfo(socket);
  sendListOfUsers();
  sendChatMessage(socket);
  setUserName(socket);
  disconnect(socket);
})

function addUser(socketId: string) {
  return {
    [socketId]: {
      userName: "Guest" + Math.floor(Math.random() * 10000),
      uuid: uuid()
    },
  }
}

function addNewUser(socket: Socket) {
  Object.assign(onlineUsers, addUser(socket.id))
}

function sendUserInfo(socket: Socket) {
  socket.emit("user info", onlineUsers[socket.id], socket.id)
}

function setUserName(socket: Socket) {
  socket.on("set user name", (userName: string) => {
    onlineUsers[socket.id].userName = userName
    io.emit("user list", Object.values(onlineUsers))
  })
}

function sendListOfUsers() {
  io.emit("user list", Object.values(onlineUsers))
}

function sendChatMessage(socket: Socket) {
  socket.on("chat message", (socketId: string, messageContent: string, roomName: string) => {
    // IF THE ROOM-NAME IS NOT "GLOBAL", FIND THE ROOM-ID FROM THE ROOM-NAME
    if (roomName !== "Global") {
      const roomId = Object.keys(onlineUsers).find(key => onlineUsers[key].uuid === roomName);
      if (roomId) {
        socket.to(roomId).emit("chat message", onlineUsers[socketId].userName, messageContent, onlineUsers[socketId].uuid)
      }
    } else {
      socket.to(roomName).emit("chat message", onlineUsers[socketId].userName, messageContent, roomName)
      globalMessages.push({
        userName: onlineUsers[socketId].userName, content: messageContent
      })
    }
  })
}

function disconnect(socket: Socket) {
  socket.on("disconnect", () => {
    console.log("user disconnected")
    if (onlineUsers[socket.id]) {
      delete onlineUsers[socket.id]
    }
    io.emit("user list", Object.values(onlineUsers))
  })
}
