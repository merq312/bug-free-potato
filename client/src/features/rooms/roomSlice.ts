import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface Message {
  content: string
  userName: string
  sentAt: string
}

export interface MessagePacket extends Message {
  roomId: string
}

export interface Room {
  [id: string]: Array<Message>
}

export interface RoomState {
  rooms: Object
}

const initialState: RoomState = {
  rooms: {
    global: [
      {
        content: "hello world",
        userName: "Guest",
        sentAt: "1635830205267",
      },
    ],
    Sombody: [
      {
        content: "hello",
        userName: "Somebody",
        sentAt: "1635830212312",
      },
    ],
  },
}

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // sendMessage: (state, action: PayloadAction<MessagePacket>) => {
    //   const roomIds = Object.keys(state.rooms)
    //   state.rooms.map((room, index) => {
    //     if (roomIds[index] === action.payload.roomId) {
    //       room.messages.concat(action.payload)
    //     }
    //     return room
    //   })
    // },
    // receiveMessage: (state, action: PayloadAction<MessagePacket>) => {
    //   const roomIds = Object.keys(state.rooms)
    //   state.rooms.map((room, index) => {
    //     if (roomIds[index] === action.payload.roomId) {
    //       room.messages.concat(action.payload)
    //     }
    //     return room
    //   })
    // },
  },
})

// export const { sendMessage, receiveMessage } = roomSlice.actions

export const selectRooms = (state: RootState) => state.rooms.rooms

export default roomSlice.reducer
