import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { createRef, RefObject, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import {
  selectMessages,
  selectTabs,
  sendMessageToRoom,
} from '../../features/room/roomSlice'
import {
  selectSocketId,
  selectUserList,
  selectUserName,
} from '../../features/user/userSlice'
import MsgClientInputComponent from '../../components/msg-client-input/Msg-client-input.component'
import MsgClientItemComponent from '../../components/msg-client-item/Msg-client-item.component'
import MsgClientTabComponent from '../../components/msg-client-tab/Msg-client-tab.component'
import MsgClientUserListComponent from '../../components/msg-client-user-list/Msg-client-user-list.component'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function MsgClientPage() {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUserName)
  const socketId = useAppSelector(selectSocketId)
  const userList = useAppSelector(selectUserList)

  const tabs = useAppSelector(selectTabs)
  const [currentTab, setCurrentTab] = useState('Global')

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

      if (typeof timeAgoString === 'string') {
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
    <div className="flex flex-col col-start-1 col-end-13 h-full border-l border-r border-gray-300 dark:border-gray-700 overflow-hidden lg:col-start-3 lg:col-end-11">
      <div
        className="h-full flex flex-col grid-rows-tabs lg:grid lg:grid-cols-12 overflow-hidden"
        ref={scrollSection}
      >
        <div className="row-span-full border-r border-b border-gray-300 dark:border-gray-700 lg:col-start-1 lg:col-end-3">
          <MsgClientUserListComponent self={userName} userList={userList} />
        </div>
        <div className="flex text-gray-800 dark:text-gray-200 mb-1 border-b border-gray-300 dark:border-gray-700 text-base lg:text-xl lg:col-start-3 lg:col-end-13">
          {tabs.map((tabId) => (
            <MsgClientTabComponent
              key={tabId}
              tabId={tabId}
              currentTab={currentTab === tabId}
              changeTab={(tabId: string) => {
                setCurrentTab(tabId)
              }}
            />
          ))}
        </div>
        <div className="scroll scrollbar border-b border-gray-300 dark:border-gray-700 flex-grow lg:h-auto flex flex-col-reverse lg:col-start-3 lg:col-end-13 overflow-y-scroll">
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

export default MsgClientPage
