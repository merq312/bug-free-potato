import { AnyAction } from "redux"
import { io } from "socket.io-client"
import { sendMessage, receiveMessage } from "../messages/messageSlice"
import { setuserName, updateUserList } from "../user/userSlice"

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

    socket.on("user list", (onlineUsers) => {
      storeAPI.dispatch(updateUserList(onlineUsers))
    })

    // Receive guest name on connect
    socket.on("guest name", (guestName) => {
      storeAPI.dispatch(setuserName(guestName))
    })

    // Sending a message
    return (next: any) => (action: AnyAction) => {
      if (sendMessage.match(action)) {
        socket.emit(
          "chat message",
          action.payload.userName,
          action.payload.content
        )
      }

      return next(action)
    }
  }
}
