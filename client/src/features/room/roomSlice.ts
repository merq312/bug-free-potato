import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import messageReducer, {
  Message,
  receiveMessage,
  sendMessage,
} from "../message/messageSlice"

export interface MessageSendPacket extends Message {
  socketId: string
  roomId: string
}

export interface MessageReceivePacket extends Message {
  roomId: string
}

export const initialState: Record<string, Array<Message>> = {
  Global: [
    {
      content:
        "Hello there! Use the input below to send a message.\nClick on your name on the bottom left to change your name.\nClick on another user's name to open a private chat with them!",
      sentAt: "1640067562461",
      userName: "Chamila",
    },
  ],
}

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    openRoom: (state, action: PayloadAction<string>) => {
      if (!Object.keys(state).find((room) => room === action.payload)) {
        return {
          ...state,
          [action.payload]: [],
        }
      }
    },
    closeRoom: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },
    sendMessageToRoom: (state, action: PayloadAction<MessageSendPacket>) => ({
      ...state,
      [action.payload.roomId]: messageReducer(
        state[action.payload.roomId],
        sendMessage({
          userName: action.payload.userName,
          content: action.payload.content,
          sentAt: action.payload.sentAt,
        })
      ),
    }),
    receiveMessageFromRoom: (
      state,
      action: PayloadAction<MessageReceivePacket>
    ) => ({
      ...state,
      [action.payload.roomId]: messageReducer(
        state[action.payload.roomId],
        receiveMessage({
          userName: action.payload.userName,
          content: action.payload.content,
          sentAt: action.payload.sentAt,
        })
      ),
    }),
  },
})

export const {
  openRoom,
  closeRoom,
  sendMessageToRoom,
  receiveMessageFromRoom,
} = roomSlice.actions

export const selectTabs = (state: RootState) => Object.keys(state.rooms)

export const selectMessages = (roomName: string) => (state: RootState) =>
  state.rooms[roomName]

export default roomSlice.reducer
