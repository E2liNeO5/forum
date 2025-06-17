import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/post";

type initialStateType = {
  posts: Post[]
}

const initialState: initialStateType = {
  posts: []
}

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    addPost: (state, { payload }: PayloadAction<Post>) => {
      state.posts.push(payload)
    }
  }
})

export const { actions: postsActions, reducer: postsReducer } = postsSlice