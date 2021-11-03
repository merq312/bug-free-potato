import { AnyAction } from "redux"
import { io } from "socket.io-client"
import { sendMessage, receiveMessage } from "../messages/messageSlice"
import { setUserName } from "../user/userSlice"

export const createSocketMiddleware = () => {
  return (storeAPI: any) => {
    let socket = io()

    // Receiving a message
    socket.on("chat message", (userName, messageContent) => {
      storeAPI.dispatch(
        receiveMessage({
          content: messageContent,
          username: userName,
          sentAt: new Date().getTime().toString(),
        })
      )
    })

    // Receive guest name on connect
    socket.on("guestName", (guestName) => {
      storeAPI.dispatch(setUserName(guestName))
    })

    // Sending a message
    return (next: any) => (action: AnyAction) => {
      if (sendMessage.match(action)) {
        socket.emit(
          "chat message",
          action.payload.username,
          action.payload.content
        )
      }

      return next(action)
    }
  }
}
