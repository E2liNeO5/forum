import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.slice";

const reducers = combineReducers({
  userReducer
})

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store