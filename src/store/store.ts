import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user.slice";
import { postsReducer } from "./posts.slice"
import { tagsReducer } from "./tags.slice"

const reducers = combineReducers({
  userReducer,
  postsReducer,
  tagsReducer
})

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store