import {Message} from "../../features/message/messageSlice"

type AppProps = {
  message: Message
  messageTimeStamp: string
}

function MsgClientItemComponent({message, messageTimeStamp}: AppProps) {
  return (
    <div
      className="flex bg-opacity-75 items-center justify-end bg-gray-300 mb-2 px-4 transition-opacity hover:bg-opacity-40">
      <div className="text-gray-800 flex flex-col justify-start my-1">
        <div className="flex justify-end">
          <div className="text-sm mr-1">
            {messageTimeStamp ? messageTimeStamp : "just now"}
          </div>
          <div className="text-sm font-bold">
            {message.userName}
          </div>
        </div>
        <div className="text-right"
             data-cy="messages"
        >{message.content}</div>
      </div>
    </div>
  )
}

export default MsgClientItemComponent
