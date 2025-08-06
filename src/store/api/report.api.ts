import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TReportData, TReportItem } from "../../types/report.types";

export const reportApi = createApi({
  reducerPath: 'api/report',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getReports: builder.query<TReportItem[], null>({
      query: () => ({
        url: '/get_reports',
        method: 'GET'
      })
    }),
    createReport: builder.mutation<null, TReportData>({
      query: data => ({
        url: '/create_report',
        body: { ...data },
        method: 'POST'
      })
    }),
    deleteReport: builder.mutation<null, number>({
      query: reportId => ({
        url: '/delete_report',
        body: { reportId },
        method: 'POST'
      })
    })
  })
})

export const {
  useGetReportsQuery,
  useCreateReportMutation,
  useDeleteReportMutation
} = reportApi