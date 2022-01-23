import { Message } from '../../features/message/messageSlice'

type AppProps = {
  message: Message
  messageTimeStamp: string
}

function MsgClientItemComponent({ message, messageTimeStamp }: AppProps) {
  return (
    <div className="flex bg-opacity-75 items-center justify-end bg-gray-300 dark:bg-gray-800 mb-2 last:mb-0 lg:last:mb-2 px-4 transition-opacity hover:bg-opacity-40">
      <div className="text-gray-800 dark:text-gray-200 flex flex-col justify-start my-1">
        <div className="flex justify-end">
          <div className="text-sm mr-1">
            {messageTimeStamp ? messageTimeStamp : 'just now'}
          </div>
          <div className="text-sm font-bold" data-cy="message-username">
            {message.userName}
          </div>
        </div>
        <div className="text-right text-lg" data-cy="message-content">
          {message.content.split('\n').map((ea, idx) => (
            <p key={idx}>{ea}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MsgClientItemComponent
