import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TAuthData, TEditUserRole, TSignUpData, TUser, TUserBanData, TUserRoleData } from "../../types/user.types";
import { TCustomError } from "../../types/global.types";
import { TUserPost } from "../../types/post.types";

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<FetchArgs, unknown, TCustomError>,
  tagTypes: ['all_users'],
  endpoints: builder => ({
    signIn: builder.mutation<TUser, TAuthData>({
      query: user => ({
          body: user,
          url: '/signIn',
          method: 'POST'
        })
    }),
    signUp: builder.mutation<TUser, TSignUpData>({
      query: user => {
        const formData = new FormData()
        formData.append('login', user.login)
        formData.append('password', user.password)
        formData.append('image', user.image[0])

        return {
            body: formData,
            url: '/signUp',
            method: 'POST'
          }
      }
    }),
    getUserById: builder.query<TUser, number>({
      query: id => ({
        params: { id },
        url: '/get_user_by_id',
        method: 'GET'
      })
    }),
    getUserPosts: builder.query<TUserPost[], number>({
      query: id => ({
        params: { id },
        url: '/get_user_posts',
        method: 'GET'
      })
    }),
    getUserRole: builder.query<TUserRoleData, number>({
      query: id => ({
        url: '/get_user_role',
        params: { id },
        method: 'GET'
      })
    }),
    getAllUsers: builder.query<TUser[], null>({
      query: () => ({
        url: '/get_all_users',
        method: 'GET'
      })
    }),
    banUser: builder.mutation<TUserRoleData, TUserBanData>({
      query: data => ({
        url: '/ban_user',
        body: {
          id: data.id,
          banReason: data.banReason
        },
        method: 'POST'
      })
    }),
    editUserRole: builder.mutation<TUserRoleData, TEditUserRole>({
      query: data => ({
        url: '/edit_user_role',
        body: {
          id: data.id,
          role: data.role
        },
        method: 'POST'
      })
    })
  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUserByIdQuery,
  useGetUserPostsQuery,
  useGetUserRoleQuery,
  useGetAllUsersQuery,
  useBanUserMutation,
  useEditUserRoleMutation
} = userApi