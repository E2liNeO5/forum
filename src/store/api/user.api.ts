import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TAuthData, TEditImageData, TEditLoginData, TEditPasswordData, TEditUserRole, TSignUpData, TUser, TUserBanData, TUserRoleData } from "../../types/user.types";
import { TUserPost } from "../../types/post.types";

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
    }),
    editUserLogin: builder.mutation<TUser, TEditLoginData>({
      query: data => ({
        url: '/edit_login',
        body: data,
        method: 'POST'
      })
    }),
    editUserPassword: builder.mutation<TUser, TEditPasswordData>({
      query: data => ({
        url: '/edit_password',
        body: data,
        method: 'POST'
      })
    }),
    editUserImage: builder.mutation<TUser, TEditImageData>({
      query: data => {
        const formData = new FormData()
        formData.append('id', String(data.id))
        formData.append('image', data.image[0])
        return {
          url: '/edit_image',
          body: formData,
          method: 'POST'
        }
      }
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
  useEditUserRoleMutation,
  useEditUserLoginMutation,
  useEditUserPasswordMutation,
  useEditUserImageMutation
} = userApi