import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectMessages,
  sendMessage,
} from "../../features/messages/messageSlice"
import { selectUser } from "../../features/user/userSlice"

function MsgClientComponent() {
  const messages = useAppSelector(selectMessages)
  const user = useAppSelector(selectUser)
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
    <div className="flex flex-col text-xl sm:text-2xl col-start-1 col-end-13 md:col-start-3 md:col-end-11 ">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        {messages.map((message) => (
          <MsgClientItemComponent key={message.sentAt} message={message} />
        ))}
      </div>
      <MsgClientInputComponent
        userName={user.name}
        sendMessageHelper={sendMessageHelper}
      />
    </div>
  )
}

export default MsgClientComponent
