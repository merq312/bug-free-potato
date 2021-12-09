import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import counterReducer from "./counter/counterSlice"
import messageReducer from "./message/messageSlice"
import userReducer from "./user/userSlice"
import roomReducer from "./room/roomSlice"
import { createSocketMiddleware } from "./middleware/socket.middleware"

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
