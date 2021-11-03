import { createRef, RefObject, useEffect, useState } from "react"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectMessages,
  sendMessage,
} from "../../features/messages/messageSlice"
import { selectuserName, selectUserList } from "../../features/user/userSlice"
import MsgClientUserListComponent from "../msg-client-user-list/msg-client-user-list.component"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

function MsgClientComponent() {
  const messages = useAppSelector(selectMessages)
  const userName = useAppSelector(selectuserName)
  const userList = useAppSelector(selectUserList)
  const dispatch = useAppDispatch()
  const scrollSection: RefObject<HTMLDivElement> = createRef()

  // Scroll to bottom whenever a new message is added/received
  useEffect(() => {
    console.log("trigger")
    if (scrollSection.current) {
      scrollSection.current.scrollTop = scrollSection.current.scrollHeight
    }
  }, [messages]) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Wrapper that is passed down into MsgClientInputComponent
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
    <div className="flex flex-col col-start-1 col-end-13 h-full overflow-hidden md:col-start-3 md:col-end-11">
      <div
        className="h-full grid grid-cols-12 overflow-y-scroll"
        ref={scrollSection}
      >
        <div className="bg-gray-400 col-start-1 col-end-3">
          <MsgClientUserListComponent userList={userList} />
        </div>
        <div className="scroll bg-gray-300 flex flex-col justify-end col-start-3 col-end-13">
          {messages.map((message, index) => (
            <MsgClientItemComponent
              key={message.sentAt}
              message={message}
              messageTimeStamp={messageTimeStamps[index]}
            />
          ))}
        </div>
      </div>
      <MsgClientInputComponent
        userName={userName}
        sendMessageHelper={sendMessageHelper}
      />
    </div>
  )
}

export default MsgClientComponent
