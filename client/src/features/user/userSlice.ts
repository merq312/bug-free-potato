import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface UserState {
  self: string
  userList: Array<string>
}

const initialState: UserState = {
  self: "Guest",
  userList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuserName: (state, action: PayloadAction<string>) => {
      state.self = action.payload
    },
    updateUserList: (state, action: PayloadAction<Array<string>>) => {
      state.userList = action.payload
    },
  },
})

export const { setuserName, updateUserList } = userSlice.actions

export const selectuserName = (state: RootState) => state.user.self
export const selectUserList = (state: RootState) => state.user.userList

export default userSlice.reducer
