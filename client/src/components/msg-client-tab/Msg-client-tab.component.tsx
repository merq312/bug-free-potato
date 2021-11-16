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
      className={`first:border-l mb-1 px-4 py-2 hover:bg-gray-300 border-r border-b border-gray-300 bg-gray-200 cursor-pointer ${currentTab ? "bg-gray-300" : "bg-gray-200"}`}>
      {tabName}
    </div>
  )
}

export default MsgClientTabComponent
