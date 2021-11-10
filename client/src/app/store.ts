import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import counterReducer from "../features/counter/counterSlice"
import messageReducer from "../features/message/messageSlice"
import userReducer from "../features/user/userSlice"
import roomReducer from "../features/room/roomSlice"
import { createSocketMiddleware } from "../features/middleware/socket.middleware"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messageReducer,
    user: userReducer,
    rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createSocketMiddleware(), logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
