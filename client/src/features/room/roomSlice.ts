import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../app/store"
import messageReducer, {Message, receiveMessage, sendMessage} from "../message/messageSlice"

export interface MessageWithRoomId extends Message {
  roomId: string
}

const initialState: Record<string, Array<Message>> = {
  Global: [
    {
      content: "hello world",
      userName: "Guest",
      sentAt: "1635830205267",
    },
  ],
  Somebody: [
    {
      content: "hello",
      userName: "Somebody",
      sentAt: "1635830212312",
    },
  ],
}

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Send message without using message reducer
    // sendMessage: (state, action: PayloadAction<MessageWithRoomId>) => ({
    //     [action.payload.roomId]: state[action.payload.roomId].concat({
    //       content: action.payload.content,
    //       sentAt: action.payload.sentAt,
    //       userName: action.payload.userName
    //     })
    //   }
    // ),
    openRoom: (state, action: PayloadAction<string>) => ({
      ...state,
      [action.payload]: []
    }),
    closeRoom: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },
    sendMessageToRoom: (state, action: PayloadAction<MessageWithRoomId>) => ({
        [action.payload.roomId]:
          messageReducer(
            state[action.payload.roomId],
            sendMessage({
                content: action.payload.content,
                sentAt: action.payload.sentAt,
                userName: action.payload.userName
              }
            ))
      }
    ),
    receiveMessageFromRoom: (state, action: PayloadAction<MessageWithRoomId>) => ({
        [action.payload.roomId]:
          messageReducer(
            state[action.payload.roomId],
            receiveMessage({
                content: action.payload.content,
                sentAt: action.payload.sentAt,
                userName: action.payload.userName
              }
            ))
      }
    ),
  },
})

export const {openRoom, closeRoom, sendMessageToRoom, receiveMessageFromRoom} = roomSlice.actions

export const selectRooms = (state: RootState) => state.rooms

export default roomSlice.reducer
