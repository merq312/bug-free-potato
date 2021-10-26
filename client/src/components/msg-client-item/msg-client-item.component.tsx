type AppProps = {
  message: string
}

function MsgClientItemComponent({ message }: AppProps) {
  return (
    <div className="flex items-center justify-end bg-gray-200 h-12 mx-2 mb-2 p-2">
      <p className="text-gray-800">{message}</p>
    </div>
  )
}

export default MsgClientItemComponent
