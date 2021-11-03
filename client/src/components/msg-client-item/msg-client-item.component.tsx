import { Message } from "../../features/messages/messageSlice"

type AppProps = {
  message: Message
  messageTimeStamp: string
}

function MsgClientItemComponent({ message, messageTimeStamp }: AppProps) {
  return (
    <div className="flex items-center justify-end bg-gray-200 mx-2 mb-2 px-4 rounded-2xl transition-opacity hover:opacity-75">
      <div className="flex flex-col justify-start my-1">
        <div className="flex justify-end">
          <div className="text-gray-700 text-sm mr-1">
            {messageTimeStamp ? messageTimeStamp : "just now"}
          </div>
          <div className="text-gray-700 text-sm font-bold">
            {message.username}
          </div>
        </div>
        <div className="text-gray-700 text-right">{message.content}</div>
      </div>
    </div>
  )
}

export default MsgClientItemComponent
