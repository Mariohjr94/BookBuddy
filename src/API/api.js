import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const booksApi = createApi({
  reducerPath: "booksApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
  }),

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books/",
    }),
    patchBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    getMyBooks: builder.query({
      query: (token) => `users/me`,
    }),
  }),
});

export const { useGetBooksQuery, usePatchBookMutation, useGetMyBooksQuery } =
  booksApi;
export default booksApi;
