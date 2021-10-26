import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface MessageState {
  messages: Array<string>
}

const initialState: MessageState = {
  messages: ["hello world", "good morning"],
}

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    send: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.concat(action.payload)
    },
  },
})

export const { send } = messageSlice.actions

export const selectMessages = (state: RootState) => state.messages.messages

export default messageSlice.reducer
