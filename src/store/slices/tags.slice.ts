import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tag } from "../../types/tag";

type StateType = {
  tags: Tag[]
  currentTags: number[]
  createPost: Tag[]
}

const initialState: StateType = {
  tags: [
    {
      id: 1,
      name: 'Тема1'
    },
    {
      id: 2,
      name: 'Тема2'
    },
    {
      id: 3,
      name: 'Тема3'
    },
    {
      id: 4,
      name: 'Тема4'
    },
    {
      id: 5,
      name: 'Тема5'
    }
  ],
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
    createPostAddTag: (state, { payload }: PayloadAction<Tag>) => {
      state.createPost.push(payload)
    },
    createPostRemoveTag: (state, { payload }: PayloadAction<Tag>) => {
      state.createPost = state.createPost.filter(tag => tag.id !== payload.id)
    },
    clearCreatePostTags: (state) => {
      state.createPost = []
    }
  }
})

export const { actions: tagsActions, reducer: tagsReducer } = tagsSlice