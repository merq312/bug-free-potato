import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"

export interface UserState {
  self: {
    id: string,
    name: string,
  }
  userList: Array<string>
}

const initialState: UserState = {
  self: {
    id: "",
    name: "Guest"
  },
  userList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.self.id = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.self.name = action.payload
    },
    updateUserList: (state, action: PayloadAction<Array<string>>) => {
      state.userList = action.payload
    },
  },
})

export const {setUserId, setUserName, updateUserList} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.self.name
export const selectUserId = (state: RootState) => state.user.self.id
export const selectUserList = (state: RootState) => state.user.userList

export default userSlice.reducer
