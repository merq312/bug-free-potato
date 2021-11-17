import {openRoom} from "../../features/room/roomSlice";
import {useAppDispatch} from "../../features/hooks";
import {otherUser} from "../../features/user/userSlice";

type AppProps = {
  self: string,
  userList: Array<otherUser>
}

function MsgClientUserListComponent({self, userList}: AppProps) {
  const dispatch = useAppDispatch()
  return (
    <>
      {userList.map((user) => (
        <div key={user.uuid}
             onClick={() => {
               if (self !== user.userName) {
                 dispatch(openRoom(user.uuid))
               }
             }}
             className={`text-gray-800 dark:text-gray-200 inline-block lg:block text-base lg:text-xl px-2 py-1 cursor-pointer ${self === user.userName ? "font-bold" : ""}`}
             data-cy="users"
        >
          {user.userName}
        </div>
      ))}
    </>
  )
}

export default MsgClientUserListComponent
