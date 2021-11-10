import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface UserState {
  self: string
  userList: Array<string>
}

const initialState: UserState = {
  self: "Guest",
  userList: ["Somebody"],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.self = action.payload
    },
    updateUserList: (state, action: PayloadAction<Array<string>>) => {
      state.userList = action.payload
    },
  },
})

export const { setUserName, updateUserList } = userSlice.actions

export const selectUserName = (state: RootState) => state.user.self
export const selectUserList = (state: RootState) => state.user.userList

export default userSlice.reducer
