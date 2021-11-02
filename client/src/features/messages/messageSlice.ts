import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Message {
  content: string
  username: string
  sentAt: string
}

export interface MessageState {
  messages: Array<Message>
}

const initialState: MessageState = {
  messages: [
    { content: "hello world", username: "guest", sentAt: "1635830205267" },
  ],
}

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    send: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.concat(action.payload)
    },
    receive: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.concat(action.payload)
    },
  },
})

export const { send, receive } = messageSlice.actions

export const selectMessages = (state: RootState) => state.messages.messages

export default messageSlice.reducer
