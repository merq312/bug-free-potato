import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export interface UserState {
  self: {
    socketId: string,
    name: string,
  }
  userList: Array<string>
}

const initialState: UserState = {
  self: {
    socketId: "",
    name: "Guest"
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
      state.self.name = action.payload
    },
    updateUserList: (state, action: PayloadAction<Array<string>>) => {
      state.userList = action.payload
    },
  },
})

export const {setSocketId, setUserName, updateUserList} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.self.name
export const selectSocketId = (state: RootState) => state.user.self.socketId
export const selectUserList = (state: RootState) => state.user.userList

export default userSlice.reducer
