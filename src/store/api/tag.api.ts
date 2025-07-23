import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TCustomError } from "../../types/global.types";
import { TTag, TTagData } from "../../types/tag.types";

export const tagApi = createApi({
  reducerPath: 'tag/api',
  baseQuery: fetchBaseQuery({ baseUrl:BASE_URL }) as BaseQueryFn<FetchArgs, unknown, TCustomError>,
  tagTypes: ['tags'],
  endpoints: builder => ({
    getTags: builder.query<TTag[], null>({
      query: () => ({
        url: '/get_tags',
        method: 'GET'
      }),
      providesTags: () => [{ type: 'tags' }]
    }),
    createTag: builder.mutation<TTag, TTagData>({
      query: data => ({
        url: '/create_tag',
        body: { name: data.name },
        method: 'POST'
      }),
      invalidatesTags: () => [{ type: 'tags' }]
    }),
    editTagName: builder.mutation<TTag, TTag>({
      query: data => ({
        url: '/edit_tag_name',
        body: { id: data.id, name: data.name },
        method: 'POST'
      })
    }),
    deleteTag: builder.mutation<null, number>({
      query: tagId => ({
        url: '/delete_tag',
        body: { tagId },
        method: 'POST'
      }),
      invalidatesTags: () => [{ type: 'tags' }]
    })
  })
})

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useEditTagNameMutation,
  useDeleteTagMutation
} = tagApi