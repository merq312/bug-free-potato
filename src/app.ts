import http from "http"
import express from "express"
import { Server, Socket } from "socket.io"
import { v4 as uuid } from "uuid"
import FixedSizeArray from "./utils/fixed-size-array"

export const app = express()
export const server = http.createServer(app)
const io = new Server(server)

interface IMClientUser {
  userName: string
  uuid: string
}

interface Message {
  userName: string
  content: string
  sentAt: string
}

const onlineUsers: Record<string, IMClientUser> = {}
const globalMessages = FixedSizeArray<Message>(10)

io.on("connection", (socket) => {
  console.log(
    `a user connected: client id (${socket.id}) client ip (${socket.handshake.address})`
  )

  socket.join("Global")

  for (const message of globalMessages) {
    if (message)
      socket.emit(
        "chat message",
        message.userName,
        message.content,
        message.sentAt,
        "Global"
      )
  }

  addNewUser(socket)
  sendUserInfo(socket)
  sendListOfUsers()
  sendChatMessage(socket)
  setUserName(socket)
  disconnect(socket)
})

function addUser(socketId: string) {
  return {
    [socketId]: {
      userName: "Guest" + Math.floor(Math.random() * 10000),
      uuid: uuid(),
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
  socket.on(
    "chat message",
    (
      socketId: string,
      messageContent: string,
      sentAt: string,
      roomId: string
    ) => {
      if (roomId !== "Global") {
        sentChatMessageOther(socket, socketId, messageContent, sentAt, roomId)
      } else {
        sendChatMessageGlobal(socket, socketId, messageContent, sentAt)
      }
    }
  )
}

function sentChatMessageOther(
  socket: Socket,
  socketId: string,
  messageContent: string,
  sentAt: string,
  roomId: string
) {
  const receiverSocketId = findSocketId(roomId)

  if (receiverSocketId) {
    socket
      .to(receiverSocketId)
      .emit(
        "chat message",
        onlineUsers[socketId].userName,
        messageContent,
        sentAt,
        onlineUsers[socketId].uuid
      )
  }
}

function findSocketId(roomName: string) {
  return Object.keys(onlineUsers).find(
    (key) => onlineUsers[key].uuid === roomName
  )
}

function sendChatMessageGlobal(
  socket: Socket,
  socketId: string,
  messageContent: string,
  sentAt: string
) {
  socket
    .to("Global")
    .emit(
      "chat message",
      onlineUsers[socketId].userName,
      messageContent,
      sentAt,
      "Global"
    )

  globalMessages.push({
    userName: onlineUsers[socketId].userName,
    content: messageContent,
    sentAt: sentAt,
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
