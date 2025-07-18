import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tagsReducer } from "./slices/tags.slice"
import { userApi } from "./api/user.api";
import { toastsReducer } from "./slices/toasts.slice";
import { userReducer } from "./slices/user.slice";
import { postApi } from "./api/post.api";

const reducers = combineReducers({
  tags: tagsReducer,
  toast: toastsReducer,
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    userApi.middleware,
    postApi.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store