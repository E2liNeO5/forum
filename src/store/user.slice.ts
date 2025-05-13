import { createSlice } from "@reduxjs/toolkit"
import { User } from "../types/user"

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