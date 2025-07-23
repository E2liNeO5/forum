import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, COMMENTS_PER_PAGE, POSTS_PER_PAGE } from "../../constants";
import { TCustomError } from "../../types/global.types";
import { TPost, TPostData, TPostsHomeParams, TPostsResponse, TSinglePost } from "../../types/post.types";
import { getCurrentDate } from "../../utils";
import { TCommentData, TCommentItem, TCommentOnPostData, TPostComment } from "../../types/comment.types";

export const postApi = createApi({
  reducerPath: 'post/api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<FetchArgs, unknown, TCustomError>,
  tagTypes: ['posts', 'comments'],
  endpoints: builder => ({
    getPosts: builder.query<TPostsResponse, TPostsHomeParams>({
      query: req => ({
        params: {
          page: req.page,
          search: req.search,
          tags: JSON.stringify(req.tags),
          postsAmount: POSTS_PER_PAGE
        },
        url: '/get_posts',
        method: 'GET'
      }),
      providesTags: () => [{ type: 'posts' }]
    }),
    getSinglePost: builder.query<TSinglePost, number>({
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
    }),
    getPostComments: builder.query<TPostComment, TCommentOnPostData>({
      query: data => ({
        url: '/get_post_comments',
        params: {
          postId: data.postId,
          page: data.page,
          commentsCount: COMMENTS_PER_PAGE
        },
        method: 'GET'
      }),
      providesTags: () => [{ type: 'comments' }]
    }),
    createComment: builder.mutation<TCommentItem, TCommentData>({
      query: comment => ({
        url: '/create_comment',
        body: comment,
        method: 'POST'
      }),
      invalidatesTags: () => [{ type: 'comments' }]
    })
  })
})

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetSinglePostQuery,
  useGetPostCommentsQuery,
  useCreateCommentMutation
} = postApi