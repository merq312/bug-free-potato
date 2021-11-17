import {useAppSelector} from "../../features/hooks";
import {selectUserFromUuid} from "../../features/user/userSlice";

type AppProps = {
  tabId: string
  currentTab: boolean
  changeTab: (arg0: string) => void
}

function MsgClientTabComponent({tabId, currentTab, changeTab}: AppProps) {
  const tabName = useAppSelector(selectUserFromUuid(tabId))

  return (
    <div
      onClick={() => changeTab(tabId)}
      className={`first:border-l px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 border-r border-gray-300 dark:border-gray-700 bg-gray-200 cursor-pointer ${currentTab ? "bg-gray-300 dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-900"}`}>
      {tabName}
    </div>
  )
}

export default MsgClientTabComponent
