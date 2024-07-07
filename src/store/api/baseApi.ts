import type { Middleware } from '@reduxjs/toolkit';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getTokensFromStorage = () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!accessToken || !refreshToken) {
      return null;
    }
    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

const setNewAccessTokenInLocalStorage = (token: string) => {
  localStorage.setItem('access_token', token);
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API}`,
  prepareHeaders: async (headers) => {
    headers.set('authorization', `Bearer ${getTokensFromStorage()?.accessToken}`);
    return headers;
  }
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API}`,
  prepareHeaders: async (headers) => {
    headers.set('authorization', `Bearer ${getTokensFromStorage()?.refreshToken}`);
  }
});

const refreshBlackListUrl = (args: string | FetchArgs) => {
  if (typeof args === 'string') {
    return false;
  }
  return ['users/sign-in', 'users/sign-up'].includes(args.url);
};

const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Refresh token flow
  if (!refreshBlackListUrl(args) && result.error && result.error.status === 401) {
    const refreshResult = await refreshBaseQuery({ url: '/users/refresh-token', method: 'POST' }, api, extraOptions);
    const res = refreshResult?.data as any;
    if (refreshResult.error) {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      api.dispatch(baseApi.util.resetApiState());
      return refreshResult;
    }
    if (res?.data?.accessToken) {
      setNewAccessTokenInLocalStorage(res.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      api.dispatch(baseApi.util.resetApiState());
      return result;
    }
  }

  return result;
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action: any) => {
  return next(action);
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({})
});

export default baseApi;
