import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tagsReducer } from "./slices/tags.slice"
import { userApi } from "./api/user.api";
import { toastsReducer } from "./slices/toasts.slice";
import { userReducer } from "./slices/user.slice";
import { postApi } from "./api/post.api";
import { textareaReducer } from "./slices/textarea.slice";
import { tagApi } from "./api/tag.api";

const reducers = combineReducers({
  tags: tagsReducer,
  toast: toastsReducer,
  user: userReducer,
  textarea: textareaReducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    userApi.middleware,
    postApi.middleware,
    tagApi.middleware
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store