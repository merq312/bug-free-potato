type AppProps = {
  tabName: string
  currentTab: boolean
  changeTab: (arg0: string) => void
  // tabId: string
}

function MsgClientTabComponent({ tabName, currentTab, changeTab }: AppProps) {
  return (
    <div
      onClick={() => changeTab(tabName)}
      className={`px-4 border-r hover:underline border-gray-700 last:border-r-0 cursor-pointer ${currentTab ? "underline" : "no-underline"}`}>
      {tabName}
    </div>
  )
}

export default MsgClientTabComponent
