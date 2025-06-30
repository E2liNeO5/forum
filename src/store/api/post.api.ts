import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, POSTS_PER_PAGE } from "../../constants";
import { TCustomError } from "../../types/global";
import { TPost, TPostData, TPostsResponse } from "../../types/post";
import { getCurrentDate } from "../../utils";

export const postApi = createApi({
  reducerPath: 'post/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<string | FetchArgs, unknown, TCustomError, {}>,
  tagTypes: ['posts'],
  endpoints: builder => ({
    getPosts: builder.query<TPostsResponse, number>({
      query: page => ({
        params: {
          page,
          postsAmount: POSTS_PER_PAGE
        },
        url: '/get_posts',
        method: 'GET'
      }),
      providesTags: () => [{ type: 'posts' }]
    }),
    getSinglePost: builder.query<TPost, number>({
      query: postId => ({
        params: { postId },
        url: '/get_single_post',
        method: 'GET'
      })
    }),
    createPost: builder.mutation<TPost, TPostData>({      
      query: post => {
        const formData = new FormData()
        formData.append('title', post.title)
        formData.append('text', post.text)
        formData.append('authorId', post.authorId.toString())
        formData.append('tags', JSON.stringify(post.tags))
        formData.append('date', getCurrentDate())
        formData.append('image', post.image[0])
        formData.append('imageSize', post.imageSize)
        
        return {
          body: formData,
          url: '/create_post',
          method: 'POST'
        }
      },
      invalidatesTags: () => [{ type: 'posts' }]
    })
  })
})

export const { useCreatePostMutation, useGetPostsQuery, useGetSinglePostQuery } = postApi