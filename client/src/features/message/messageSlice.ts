import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Message {
  content: string
  userName: string
  sentAt: string
}

const initialState: Array<Message> = [
    { content: "hello world", userName: "Guest", sentAt: "1635830205267" },
  ]

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => state.concat(action.payload),
    receiveMessage: (state, action: PayloadAction<Message>) => state.concat(action.payload),
  },
})

export const { sendMessage, receiveMessage } = messageSlice.actions

export const selectMessages = (state: RootState) => state.messages

export default messageSlice.reducer
