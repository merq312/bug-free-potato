import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Message {
  content: string
  userName: string
  sentAt: string
}

const initialState: Array<Message> = []

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => state.concat(action.payload),
    receiveMessage: (state, action: PayloadAction<Message>) => state.concat(action.payload),
  },
})

export const { sendMessage, receiveMessage } = messageSlice.actions

export default messageSlice.reducer
