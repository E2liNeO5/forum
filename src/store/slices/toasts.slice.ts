import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Toast, ToastInitialState } from "../../types/toast"

const initialState: ToastInitialState = {
  toasts: []
}

const toastsSlice = createSlice({
  name: 'toastsSlice',
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toasts.push(payload)
    },
    removeToast: (state, { payload }: PayloadAction<Pick<Toast, 'id'>>) => {
      state.toasts = state.toasts.filter(item => item.id !== payload.id)
    }
  }
})

export const { actions: toastsActions, reducer: toastsReducer } = toastsSlice