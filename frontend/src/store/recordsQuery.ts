import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Record } from "../types/Record";

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Record"],
  endpoints: (builder) => ({
    getIncomes: builder.query<
      { result: Record[]; total: number },
      {
        type?: string;
        title?: string;
        status?: boolean;
        start: number;
        count: number;
      }
    >({
      query: ({ type, title, status, start, count }) => ({
        url: "/get-records",
        params: {
          type,
          title,
          status,
          start,
          count,
        },
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        error: boolean;
        records: Record[];
      }) => {
        return { result: response.records, total: response.records.length };
      },
      providesTags: ["Record"],
    }),
  }),
});

export const { useGetIncomesQuery } = recordsApi;
