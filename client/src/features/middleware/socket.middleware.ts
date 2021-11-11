import { AnyAction } from "redux"
import { io } from "socket.io-client"
import {setSocketId, setUserName, updateUserList} from "../user/userSlice"
import {receiveMessageFromRoom, sendMessageToRoom} from "../room/roomSlice";

export const createSocketMiddleware = () => {
  return (storeAPI: any) => {
    let socket = io()

    // Receiving a message
    socket.on("chat message", (userName, messageContent, roomName) => {
      storeAPI.dispatch(
        receiveMessageFromRoom({
          content: messageContent,
          userName: userName,
          sentAt: new Date().getTime().toString(),
          roomName: roomName
        })
      )
    })

    // Receive list of online users (whenever it changes)
    socket.on("user list", (onlineUsers) => {
      storeAPI.dispatch(updateUserList(onlineUsers))
    })

    // Receive guest name on connect
    socket.on("guest name and id", (guestName, socketId) => {
      storeAPI.dispatch(setUserName(guestName))
      storeAPI.dispatch(setSocketId(socketId))
    })

    return (next: any) => (action: AnyAction) => {
      // Sending a message
      if (sendMessageToRoom.match(action)) {
        socket.emit(
          "chat message",
          action.payload.socketId,
          action.payload.content,
          action.payload.roomName
        )
      }

      // Updating user name
      if (setUserName.match(action)) {
        socket.emit(
          "set user name",
          action.payload
        )
      }

      return next(action)
    }
  }
}
