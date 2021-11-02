import { Message } from "../../features/messages/messageSlice"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"

type AppProps = {
  message: Message
}

function MsgClientItemComponent({ message }: AppProps) {
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo("en-US")

  return (
    <div className="flex items-center justify-end bg-gray-200 mx-2 mb-2 px-4 rounded-2xl transition-opacity hover:opacity-75">
      <div className="flex flex-col justify-start my-1">
        <div className="flex justify-end">
          <div className="text-gray-700 text-sm mr-1">
            {timeAgo.format(new Date(parseInt(message.sentAt)))}
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
