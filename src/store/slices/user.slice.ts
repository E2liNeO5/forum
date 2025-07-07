import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser, TUserInitialState } from "../../types/user.types";
import { USER_KEY } from "../../constants";
import { localStorageGet, localStorageSet } from "../../utils";

const initialState: TUserInitialState = {
  user: localStorageGet(USER_KEY) || null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<TUser>) => {
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