import { useEffect, useState } from "react"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"

import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectMessages,
  sendMessage,
} from "../../features/messages/messageSlice"
import { selectuserName } from "../../features/user/userSlice"

function MsgClientComponent() {
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo("en-US")

  const messages = useAppSelector(selectMessages)
  const userName = useAppSelector(selectuserName)
  const dispatch = useAppDispatch()

  const [messageTimeStamps, setMessageTimeStamps] = useState(
    new Array<string>()
  )

  const updateMessageTimeStamps = () => {
    const newMessageTimeStamps = new Array<string>()
    messages.forEach((message, index) => {
      const timeAgoString = timeAgo.format(new Date(parseInt(message.sentAt)))

      if (typeof timeAgoString === "string") {
        newMessageTimeStamps[index] = timeAgoString
      }
    })

    setMessageTimeStamps(newMessageTimeStamps)
  }

  useEffect(updateMessageTimeStamps, [messages]) // eslint-disable-line react-hooks/exhaustive-deps
  setTimeout(updateMessageTimeStamps, 1000)

  const sendMessageHelper = (messageContent: string) => {
    dispatch(
      sendMessage({
        content: messageContent,
        userName: userName,
        sentAt: new Date().getTime().toString(),
      })
    )
  }

  return (
    <div className="flex flex-col text-xl sm:text-2xl col-start-1 col-end-13 md:col-start-3 md:col-end-11 ">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        {messages.map((message, index) => (
          <MsgClientItemComponent
            key={message.sentAt}
            message={message}
            messageTimeStamp={messageTimeStamps[index]}
          />
        ))}
      </div>
      <MsgClientInputComponent
        userName={userName}
        sendMessageHelper={sendMessageHelper}
      />
    </div>
  )
}

export default MsgClientComponent
