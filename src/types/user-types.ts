import { z } from 'zod';
import { signInSchema, signUpSchema } from '../validations/user-validations';

export type SignUpModel = z.infer<typeof signUpSchema>;

export type SignInModel = z.infer<typeof signInSchema>;

export type UserModel = {
  avatar: string | null;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
};

export type TokenModel = {
  accessToken: string | null;
  refreshToken: string;
};
