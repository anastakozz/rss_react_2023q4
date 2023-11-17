import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Shows } from '../modules/types';
import { ShowsProps } from '../modules/interfaces';

const baseUrl = 'https://api.myshows.me/v2/rpc/';

type apiParams = {
  [key: string]: string | number | boolean | apiParams;
};

interface ApiResponse<T> {
  result: T;
}

const settings = {
  url: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const body = {
  jsonrpc: '2.0',
  id: 1,
};

export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getShowData: builder.query<
      ApiResponse<ShowsProps>,
      { method: string; params: apiParams }
    >({
      query: ({ method, params }) => ({
        ...settings,
        body: {
          ...body,
          method,
          params,
        },
      }),
    }),
    getShowsList: builder.query<
      ApiResponse<Shows>,
      { method: string; params: apiParams }
    >({
      query: ({ method, params }) => ({
        ...settings,
        body: {
          ...body,
          method,
          params,
        },
      }),
    }),
    getShowsNumber: builder.query<
      ApiResponse<number>,
      { method: string; params: apiParams }
    >({
      query: ({ method, params }) => ({
        ...settings,
        body: {
          ...body,
          method,
          params,
        },
      }),
    }),
  }),
});

export const {
  useGetShowDataQuery,
  useGetShowsListQuery,
  useGetShowsNumberQuery,
} = showsApi;
