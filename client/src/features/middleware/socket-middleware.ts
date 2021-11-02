import { AnyAction } from "redux"
import { io } from "socket.io-client"
import { sendMessage, receiveMessage } from "../messages/messageSlice"

export const createMySocketMiddleware = () => {
  return (storeAPI: any) => {
    let socket = io()

    // Receiving a message
    socket.on("chat message", (msg) => {
      storeAPI.dispatch(
        receiveMessage({
          content: msg,
          username: "guest",
          sentAt: new Date().getTime().toString(),
        })
      )
    })

    // Sending a message
    return (next: any) => (action: AnyAction) => {
      if (sendMessage.match(action)) {
        socket.emit("chat message", action.payload.content)
      }

      return next(action)
    }
  }
}
