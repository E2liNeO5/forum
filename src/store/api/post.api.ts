import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { CustomError } from "../../types/global";
import { Post, PostDataType } from "../../types/post";
import { getCurrentDate } from "../../utils";

export const postApi = createApi({
  reducerPath: 'post/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: builder => ({
    createPost: builder.mutation<Post, PostDataType>({      
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
      }
    })
  })
})

export const { useCreatePostMutation } = postApi