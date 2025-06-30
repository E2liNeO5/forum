import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TToast, TToastInitialState } from "../../types/toast"

const initialState: TToastInitialState = {
  toasts: []
}

const toastsSlice = createSlice({
  name: 'toastsSlice',
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<TToast>) => {
      state.toasts.push(payload)
    },
    removeToast: (state, { payload }: PayloadAction<Pick<TToast, 'id'>>) => {
      state.toasts = state.toasts.filter(item => item.id !== payload.id)
    }
  }
})

export const { actions: toastsActions, reducer: toastsReducer } = toastsSlice