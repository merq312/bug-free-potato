import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export interface otherUser {
  uuid: string,
  userName: string,
}

export interface UserState {
  self: {
    socketId: string,
    userName: string,
  }
  userList: Array<otherUser>
}

const initialState: UserState = {
  self: {
    socketId: "",
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
    updateUserList: (state, action: PayloadAction<Array<otherUser>>) => {
      state.userList = action.payload
    },
  },
})

export const {setSocketId, setUserName, updateUserList} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.self.userName
export const selectSocketId = (state: RootState) => state.user.self.socketId
export const selectUserList = (state: RootState) => state.user.userList

export default userSlice.reducer
