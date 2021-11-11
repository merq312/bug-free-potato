import {useAppSelector} from "../../app/hooks";
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
      className={`px-4 border-r hover:underline border-gray-700 last:border-r-0 cursor-pointer ${currentTab ? "underline" : "no-underline"}`}>
      {tabName}
    </div>
  )
}

export default MsgClientTabComponent
