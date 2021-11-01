type AppProps = {
  message: string
}

function MsgClientItemComponent({ message }: AppProps) {
  return (
    <div className="flex items-center justify-end bg-gray-200 h-12 mx-2 mb-2 py-2 px-4 rounded-2xl">
      <p className="text-gray-700 text-xl">{message}</p>
    </div>
  )
}

export default MsgClientItemComponent
