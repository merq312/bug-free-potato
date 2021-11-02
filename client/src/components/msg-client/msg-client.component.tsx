import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectMessages,
  sendMessage,
} from "../../features/messages/messageSlice"

function MsgClientComponent() {
  const messages = useAppSelector(selectMessages)
  const dispatch = useAppDispatch()

  const sendMessageHelper = (msg: string) => {
    dispatch(
      sendMessage({
        content: msg,
        username: "guest",
        sentAt: new Date().getTime().toString(),
      })
    )
  }

  return (
    <div className="flex flex-col text-2xl lg:col-start-3 lg:col-end-11 col-start-1 col-end-13">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        {messages.map((message) => (
          <MsgClientItemComponent
            key={message.sentAt}
            message={message.content}
          />
        ))}
      </div>
      <MsgClientInputComponent sendMessageHelper={sendMessageHelper} />
    </div>
  )
}

export default MsgClientComponent
