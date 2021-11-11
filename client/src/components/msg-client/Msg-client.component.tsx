import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import {createRef, RefObject, useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {selectTabs, selectMessages, sendMessageToRoom} from "../../features/room/roomSlice"
import {selectSocketId, selectUserList, selectUserName} from "../../features/user/userSlice"
import MsgClientInputComponent from "../msg-client-input/Msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/Msg-client-item.component"
import MsgClientTabComponent from "../msg-client-tab/Msg-client-tab.component"
import MsgClientUserListComponent from "../msg-client-user-list/Msg-client-user-list.component"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

function MsgClientComponent() {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUserName)
  const socketId = useAppSelector(selectSocketId)
  const userList = useAppSelector(selectUserList)

  const tabs = useAppSelector(selectTabs)
  const [currentTab, setCurrentTab] = useState("Global")

  const messages = useAppSelector(selectMessages(currentTab))

  const scrollSection: RefObject<HTMLDivElement> = createRef()

  // Scroll to bottom whenever a new message is added/received
  useEffect(() => {
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
      sendMessageToRoom({
        socketId: socketId,
        userName: userName,
        content: messageContent,
        roomId: currentTab,
        sentAt: new Date().getTime().toString(),
      })
    )
  }

  return (
    <div className="flex flex-col col-start-1 col-end-13 h-full overflow-hidden md:col-start-3 md:col-end-11">
      <div
        className="h-full flex flex-col grid-rows-tabs md:grid md:grid-cols-12 overflow-hidden"
        ref={scrollSection}
      >
        <div className="bg-gray-400 row-span-full md:col-start-1 md:col-end-3">
          <MsgClientUserListComponent userList={userList}/>
        </div>
        <div className="flex bg-gray-300 text-gray-800 text-base md:text-xl px-2 py-1 md:col-start-3 md:col-end-13">
          {tabs.map((tabId) => (
            <MsgClientTabComponent
              key={tabId}
              tabId = {tabId}
              currentTab={currentTab === tabId}
              changeTab={(tabId: string) => {
                setCurrentTab(tabId)
              }}/>
          ))}
        </div>
        <div
          className="scroll flex-grow md:h-auto bg-gray-300 flex flex-col-reverse md:col-start-3 md:col-end-13 overflow-y-scroll">
          <div>
            {messages.map((message, index) => (
              <MsgClientItemComponent
                key={message.sentAt}
                message={message}
                messageTimeStamp={messageTimeStamps[index]}
              />
            ))}
          </div>
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
