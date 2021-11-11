import {openRoom} from "../../features/room/roomSlice";
import {useAppDispatch} from "../../app/hooks";
import {otherUser} from "../../features/user/userSlice";

type AppProps = {
  userList: Array<otherUser>
}

function MsgClientUserListComponent({ userList }: AppProps) {
  const dispatch = useAppDispatch()
  return (
    <>
      {userList.map((user) => (
        <div key={user.uuid} onClick={() => dispatch(openRoom(user.uuid))} className="text-gray-800 inline-block md:block text-base md:text-xl px-2 py-1 cursor-pointer">
          {user.userName}
        </div>
      ))}
    </>
  )
}

export default MsgClientUserListComponent
