import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Items } from '../helpers/types';

const URL = 'https://swapi.dev/api/people';

interface ItemsResponse {
  results: Items[];
  next: string | null;
  previous: string | null;
}

const reducerPath = 'starWarsApi';

export const api = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getStarWarsPeople: builder.query<ItemsResponse, string | null>({
      query: (query) => `?${query}`,
    }),
    getStarwarsPerson: builder.query<Items, string>({
      query: (id) => `${id}`,
      transformErrorResponse: (
        error
      ): FetchBaseQueryError & { message?: string } => {
        return {
          ...error,
          ...('data' in error && {
            message: (error.data as { detail: string }).detail,
          }),
        };
      },
    }),
  }),
});

export const { useGetStarWarsPeopleQuery, useGetStarwarsPersonQuery } = api;
