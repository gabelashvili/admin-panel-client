import { Link, useNavigate } from 'react-router-dom';
import { Avatar, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../validations/user-validations';
import type { SignInModel } from '../types/user-types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import authApi from '../store/api/userApi';
import { ResponseErrorModel } from '../types/common-types';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import paths from '../utils/paths';

export default function SignIn() {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = authApi.useSignInMutation();
  const [getAuthedUser] = authApi.useLazyAuthedUserQuery();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInModel>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await signIn(data).unwrap();
      localStorage.setItem('refresh_token', result.data.tokens.refreshToken);
      localStorage.setItem('access_token', result.data.tokens.accessToken!);
      await getAuthedUser();
      toast.success('You have successfully logged in');
      navigate('/');
    } catch (error) {
      const errorCode = (error as ResponseErrorModel).data.message;
      let errorMessage = 'Something went wrong';
      if (errorCode === 'notFound') {
        errorMessage = 'User not founds';
      }
      toast.error(errorMessage);
    }
  });

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" mb={4}>
        Sign in
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <TextField fullWidth label="Email Address" autoComplete="email" {...register('email')} error={!!errors.email} />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          error={!!errors.password}
          {...register('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <LoadingButton
          loading={isLoading}
          onClick={onSubmit}
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Sign In
        </LoadingButton>
        <Box
          sx={{
            display: 'flex',
            my: 2,
            '& >*': {
              m: 'auto',
              textDecoration: 'none',
              color: 'text.secondary'
            }
          }}>
          <Link to={paths.auth.signUp}>{'Don`t have an account? Sign Up'}</Link>
        </Box>
      </Box>
    </>
  );
}
