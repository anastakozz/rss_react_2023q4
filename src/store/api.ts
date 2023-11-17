import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Shows } from '../modules/types';
import { ShowsProps } from '../modules/interfaces';

const baseUrl = 'https://api.myshows.me/v2/rpc/';

type apiParams = {
  [key: string]: string | number | boolean | apiParams;
};

interface ApiResponse {
  result: Shows | ShowsProps | number;
}

export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getApiData: builder.query<
      ApiResponse,
      { method: string; params: apiParams }
    >({
      query: ({ method, params }) => ({
        url: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: {
          jsonrpc: '2.0',
          method,
          params,
          id: 1,
        },
      }),
    }),
  }),
});

export const { useGetApiDataQuery } = showsApi;
