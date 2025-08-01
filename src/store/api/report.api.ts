import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";
import { TReportItem } from "../../types/report.types";

export const reportApi = createApi({
  reducerPath: 'api/report',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getReports: builder.query<TReportItem[], null>({
      query: () => ({
        url: '/get_reports',
        method: 'GET'
      })
    })
  })
})

export const {
  useGetReportsQuery
} = reportApi