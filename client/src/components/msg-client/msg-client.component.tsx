import { io } from "socket.io-client"
import { useEffect } from "react"
import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectMessages, send } from "../../features/messages/messageSlice"

function MsgClientComponent() {
  const messages = useAppSelector(selectMessages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = io()

    socket.on("chat message", (user, msg) => {
      // Do something
    })
  })

  const sendMessage = (msg: string) => {
    dispatch(send(msg))
  }

  return (
    <div className="flex flex-col text-2xl lg:col-start-3 lg:col-end-11 col-start-1 col-end-13">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        {messages.map((message) => (
          <MsgClientItemComponent message={message} />
        ))}
      </div>
      <MsgClientInputComponent sendMessage={sendMessage} />
    </div>
  )
}

export default MsgClientComponent
