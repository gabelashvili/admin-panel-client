import baseApi from './baseApi';
import type { ResponseModel } from '../../types/common-types';
import type { SignInModel, SignUpModel, TokenModel, UserModel } from '../../types/user-types';
import { createSelector } from '@reduxjs/toolkit';

const tags = {
  getAuthedUser: 'authApi/getAuthedUser'
};
const authApi = baseApi.enhanceEndpoints({ addTagTypes: [...Object.values(tags)] }).injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<ResponseModel<null>, SignUpModel>({
      query: (arg) => ({
        url: 'users/sign-up',
        method: 'POST',
        body: arg
      })
    }),
    signIn: build.mutation<ResponseModel<{ user: UserModel; tokens: TokenModel }>, SignInModel>({
      query: (arg) => ({
        url: 'users/sign-in',
        method: 'POST',
        body: arg
      })
    }),
    pingUser: build.mutation<ResponseModel<null>, void>({
      query: (arg) => ({
        url: 'users/ping',
        method: 'POST',
        body: arg
      })
    }),
    authedUser: build.query<ResponseModel<{ user: UserModel }>, void>({
      query: (arg) => ({
        url: 'users/me',
        body: arg
      }),
      providesTags: [tags.getAuthedUser]
    }),
    updateAuthedUser: build.mutation<ResponseModel<{ user: UserModel }>, FormData>({
      query: (arg) => ({
        url: 'users/me',
        body: arg,
        method: 'POST'
      }),
      invalidatesTags: (_, error) => (error ? [] : [tags.getAuthedUser])
    })
  })
});

export default authApi;

export const selectAuthedUser = createSelector(authApi.endpoints.authedUser.select(), (rolesResult) => rolesResult?.data?.data?.user);
