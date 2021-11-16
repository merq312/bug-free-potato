import {AnyAction} from "redux"
import {io} from "socket.io-client"
import {setSocketId, setUserId, setUserName, updateUserList} from "../user/userSlice"
import {receiveMessageFromRoom, sendMessageToRoom} from "../room/roomSlice";

export const createSocketMiddleware = () => {
  return (storeAPI: any) => {
    let socket = io()

    // Receiving a message
    socket.on("chat message", (userName, messageContent, sentAt, roomName) => {
      storeAPI.dispatch(
        receiveMessageFromRoom({
          content: messageContent,
          userName: userName,
          sentAt: sentAt,
          roomId: roomName
        })
      )
    })

    // Receive list of online users (whenever it changes)
    socket.on("user list", (onlineUsers) => {
      storeAPI.dispatch(updateUserList(onlineUsers))
    })

    // Receive guest name on connect
    socket.on("user info", (user, socketId) => {
      storeAPI.dispatch(setUserName(user.userName))
      storeAPI.dispatch(setUserId(user.uuid))
      storeAPI.dispatch(setSocketId(socketId))
    })

    return (next: any) => (action: AnyAction) => {
      // Sending a message
      if (sendMessageToRoom.match(action)) {
        socket.emit(
          "chat message",
          action.payload.socketId,
          action.payload.content,
          action.payload.sentAt,
          action.payload.roomId,
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
