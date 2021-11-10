import { AnyAction } from "redux"
import { io } from "socket.io-client"
import { sendMessage, receiveMessage } from "../message/messageSlice"
import { setUserName, updateUserList } from "../user/userSlice"

export const createSocketMiddleware = () => {
  return (storeAPI: any) => {
    let socket = io()

    // Receiving a message
    socket.on("chat message", (userName, messageContent) => {
      storeAPI.dispatch(
        receiveMessage({
          content: messageContent,
          userName: userName,
          sentAt: new Date().getTime().toString(),
        })
      )
    })

    // Receive list of online users (whenever it changes)
    socket.on("user list", (onlineUsers) => {
      storeAPI.dispatch(updateUserList(onlineUsers))
    })

    // Receive guest name on connect
    socket.on("guest name", (guestName) => {
      storeAPI.dispatch(setUserName(guestName))
    })

    return (next: any) => (action: AnyAction) => {
      // Sending a message
      if (sendMessage.match(action)) {
        socket.emit(
          "chat message",
          action.payload.userName,
          action.payload.content
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
