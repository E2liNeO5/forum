import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TToast, TToastData, TToastInitialState } from "../../types/toast.types"

const initialState: TToastInitialState = {
  toasts: []
}

const toastsSlice = createSlice({
  name: 'toastsSlice',
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<TToastData>) => {
      state.toasts.push({ id: Date.now(), ...payload })
    },
    removeToast: (state, { payload }: PayloadAction<Pick<TToast, 'id'>>) => {
      state.toasts = state.toasts.filter(item => item.id !== payload.id)
    }
  }
})

export const { actions: toastsActions, reducer: toastsReducer } = toastsSlice