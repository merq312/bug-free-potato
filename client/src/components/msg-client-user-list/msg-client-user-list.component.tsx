type AppProps = {
  userList: Array<string>
}

function MsgClientUserListComponent({ userList }: AppProps) {
  return (
    <>
      {userList.map((userName) => (
        <div className="text-gray-800 text-xl px-2 py-1">{userName}</div>
      ))}
    </>
  )
}

export default MsgClientUserListComponent
