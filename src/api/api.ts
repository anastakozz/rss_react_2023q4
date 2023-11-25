import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Shows } from '../modules/types';
import { ShowsProps } from '../modules/interfaces';
import { HYDRATE } from 'next-redux-wrapper'

export const baseUrl = 'https://api.myshows.me/v2/rpc/';

type apiParams = {
  [key: string]: string | number | boolean | apiParams;
};

interface ApiResponse<T> {
  result: T;
}

type queryParams = {method: string, params: apiParams};

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

const generateQuery = ({ method, params }: queryParams) => ({
  ...settings,
  body: {
    ...body,
    method,
    params,
  },
});


export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getShowData: builder.query<ApiResponse<ShowsProps>,queryParams>({
      query: ({ method, params }) => generateQuery({ method, params }),
    }),
    getShowsList: builder.query<ApiResponse<Shows>, queryParams>({
      query: ({ method, params }) => generateQuery({ method, params }),
    }),
    getShowsNumber: builder.query<ApiResponse<number>, queryParams>({
      query: ({ method, params }) => generateQuery({ method, params }),
    }),
  }),
});

export const {
  useGetShowDataQuery,
  useGetShowsListQuery,
  useGetShowsNumberQuery,
} = showsApi;
