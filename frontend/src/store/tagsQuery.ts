import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../types/Tag";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
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
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getTags: builder.query<
      { result: Tag[]; total: number },
      {
        type?: string;
        title?: string;
        start: number;
        count: number;
      }
    >({
      query: ({ type, title, start, count }) => ({
        url: "/get-tags",
        params: {
          type,
          title,
          start,
          count,
        },
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        error: boolean;
        tags: Tag[];
      }) => {
        return { result: response.tags, total: response.tags.length };
      },
      providesTags: ["Tag"],
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
