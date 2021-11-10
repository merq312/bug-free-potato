type AppProps = {
  tabName: string
  // tabId: string
}

function MsgClientTabComponent({ tabName }: AppProps) {
  return (
    <div className="px-4 border-r no-underline hover:underline border-gray-700 last:border-r-0 cursor-pointer">
      {tabName}
    </div>
  )
}

export default MsgClientTabComponent
