import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Message {
  content: string
  userName: string
  sentAt: string
}

export interface MessageState {
  messages: Array<Message>
}

const initialState: MessageState = {
  messages: [
    { content: "hello world", userName: "Guest", sentAt: "1635830205267" },
  ],
}

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.concat(action.payload)
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.concat(action.payload)
    },
  },
})

export const { sendMessage, receiveMessage } = messageSlice.actions

export const selectMessages = (state: RootState) => state.messages.messages

export default messageSlice.reducer
