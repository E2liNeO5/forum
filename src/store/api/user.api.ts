import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { AuthData, User } from "../../types/user";
import { CustomError } from "../../types/global";

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: builder => ({
    signIn: builder.mutation<User, AuthData>({
      query: user => ({
          body: user,
          url: '/signIn',
          method: 'POST'
        })
    }),
    signUp: builder.mutation<User, AuthData>({
      query: user => ({
          body: user,
          url: '/signUp',
          method: 'POST'
        })
    })
  })
})

export const { useSignInMutation, useSignUpMutation } = userApi