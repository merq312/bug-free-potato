import {openRoom} from "../../features/room/roomSlice";
import {useAppDispatch} from "../../app/hooks";

type AppProps = {
  userList: Array<string>
}

function MsgClientUserListComponent({ userList }: AppProps) {
  const dispatch = useAppDispatch()
  return (
    <>
      {userList.map((userName) => (
        <div key={userName} onClick={() => dispatch(openRoom(userName))} className="text-gray-800 inline-block md:block text-base md:text-xl px-2 py-1 cursor-pointer">
          {userName}
        </div>
      ))}
    </>
  )
}

export default MsgClientUserListComponent
