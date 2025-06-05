import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserInitialState } from "../../types/user";
import { USER_KEY } from "../../constants";
import { localStorageGet, localStorageSet } from "../../utils";

const initialState: UserInitialState = {
  user: localStorageGet(USER_KEY) || null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
      localStorageSet(USER_KEY, payload)
    },
    removeUser: (state) => {
      state.user = null
      localStorageSet(USER_KEY, null)
    }
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice