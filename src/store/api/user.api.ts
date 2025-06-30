import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TAuthData, TUser } from "../../types/user";
import { TCustomError } from "../../types/global";

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<string | FetchArgs, unknown, TCustomError, {}>,
  endpoints: builder => ({
    signIn: builder.mutation<TUser, TAuthData>({
      query: user => ({
          body: user,
          url: '/signIn',
          method: 'POST'
        })
    }),
    signUp: builder.mutation<TUser, TAuthData>({
      query: user => ({
          body: user,
          url: '/signUp',
          method: 'POST'
        })
    })
  })
})

export const { useSignInMutation, useSignUpMutation } = userApi