import { createSlice } from "@reduxjs/toolkit"

const initialState: User = {
  name: 'Егор',
  password: '123',
  gender: 'Мужской',
  postAmount: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPost: (state) => {
      state.postAmount++
    }
  }
})

export const { reducer: userReducer, actions: userActions } = userSlice