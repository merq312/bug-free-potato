import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"

export interface otherUser {
  uuid: string,
  userName: string,
}

export interface UserState {
  self: {
    socketId: string,
    userId: string,
    userName: string,
  }
  userList: Array<otherUser>
}

const initialState: UserState = {
  self: {
    socketId: "",
    userId: "123",
    userName: "Guest"
  },
  userList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSocketId: (state, action: PayloadAction<string>) => {
      state.self.socketId = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.self.userName = action.payload
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.self.userId = action.payload
    },
    updateUserList: (state, action: PayloadAction<Array<otherUser>>) => {
      state.userList = action.payload
    },
  },
})

export const {setSocketId, setUserName, setUserId, updateUserList} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.self.userName
export const selectSocketId = (state: RootState) => state.user.self.socketId
export const selectUserList = (state: RootState) => state.user.userList
export const selectUserFromUuid = (uuid: string) => (state: RootState) => {
  const userList = selectUserList(state)
  const user = userList.find(user => user.uuid === uuid)

  return user ? user.userName : "Global"
}

export default userSlice.reducer
