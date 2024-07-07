import { z } from 'zod';

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().trim().min(8),
    repeatPassword: z.string().trim().min(8)
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword']
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1)
});
