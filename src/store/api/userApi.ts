import baseApi from './baseApi';
import type { ResponseModel } from '../../types/common-types';
import type { SignInModel, SignUpModel, TokenModel, UserModel } from '../../types/user-types';
import { createSelector } from '@reduxjs/toolkit';

const authApi = baseApi.injectEndpoints({
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
      })
    })
  })
});

export default authApi;

export const selectAuthedUser = createSelector(authApi.endpoints.authedUser.select(), (rolesResult) => rolesResult?.data?.data?.user);
