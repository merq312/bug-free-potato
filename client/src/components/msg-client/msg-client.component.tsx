import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector } from "../../app/hooks"
import { selectMessages } from "../../features/messages/messageSlice"

function MsgClientComponent() {
  const messages = useAppSelector(selectMessages)

  return (
    <div className="flex flex-col text-2xl lg:col-start-3 lg:col-end-11 col-start-1 col-end-13">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        {messages.map((message) => (
          <MsgClientItemComponent message={message} />
        ))}
      </div>
      <MsgClientInputComponent />
    </div>
  )
}

export default MsgClientComponent
