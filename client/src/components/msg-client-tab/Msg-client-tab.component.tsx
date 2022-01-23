import { useAppDispatch, useAppSelector } from "../../features/hooks"
import { selectUserFromUuid } from "../../features/user/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { closeRoom } from "../../features/room/roomSlice"

type AppProps = {
  tabId: string
  currentTab: boolean
  changeTab: (arg0: string) => void
}

function MsgClientTabComponent({ tabId, currentTab, changeTab }: AppProps) {
  const tabName = useAppSelector(selectUserFromUuid(tabId))
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => changeTab(tabId)}
      className={`first:border-l px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 border-r border-gray-300 dark:border-gray-700 bg-gray-200 cursor-pointer flex justify-between items-center ${
        currentTab
          ? "bg-gray-300 dark:bg-gray-800"
          : "bg-gray-200 dark:bg-gray-900"
      }`}
    >
      <span>{tabName}</span>
      {tabId !== "Global" ? (
        <span
          className="ml-2"
          onClick={(e) => {
            e.stopPropagation()
            changeTab("Global")
            dispatch(closeRoom(tabId))
          }}
        >
          <FontAwesomeIcon
            className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
            icon={faTimes}
          />
        </span>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MsgClientTabComponent
