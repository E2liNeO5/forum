import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: ''
}

const textareaSlice = createSlice({
  name: 'textareaSlice',
  initialState,
  reducers: {
    setTextareaText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload
    },
    resetTextarea: (state) => {
      state.text = ''
    },
    addToTextarea: (state, { payload }: PayloadAction<string>) => {
      state.text += payload
    }
  }
})

export const { actions: textareaActions, reducer: textareaReducer } = textareaSlice