import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { logger } from "redux-logger"
import counterReducer from "../features/counter/counterSlice"
import messageReducer from "../features/messages/messageSlice"
import { createMySocketMiddleware } from "../features/middleware/socket-middleware"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createMySocketMiddleware(), logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
