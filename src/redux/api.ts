import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from './store';
import { Item } from '../helpers/types';

interface ItemsResponse {
  results: Item[];
  next: string | null;
  previous: string | null;
  count: number;
}

const reducerPath = 'starWarsApi';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),

  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, never, 'starWarsApi'> {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    getStarWarsPeople: builder.query<
      ItemsResponse,
      { page?: string; search?: string }
    >({
      query: (params) => ({ params, url: 'people' }),
    }),
    getStarwarsPerson: builder.query<Item, string>({
      query: (id) => `/people/${id}`,

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
