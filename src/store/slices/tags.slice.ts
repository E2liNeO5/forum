import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTag } from "../../types/tag.types";

type StateType = {
  currentTags: number[]
  createPost: TTag[]
}

const initialState: StateType = {
  currentTags: [],
  createPost: []
}

const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState,
  reducers: {
    selectTag: (state, { payload }: PayloadAction<number>) => {
      if(state.currentTags.includes(payload) && payload !== 0) {
        const index = state.currentTags.indexOf(payload)
        state.currentTags.splice(index, 1)
      } else if(payload === 0)
        state.currentTags.length = 0
      else
        state.currentTags.push(payload)
    },
    createPostAddTag: (state, { payload }: PayloadAction<TTag>) => {
      state.createPost.push(payload)
    },
    createPostRemoveTag: (state, { payload }: PayloadAction<TTag>) => {
      state.createPost = state.createPost.filter(tag => tag.id !== payload.id)
    },
    clearCreatePostTags: (state) => {
      state.createPost = []
    }
  }
})

export const { actions: tagsActions, reducer: tagsReducer } = tagsSlice