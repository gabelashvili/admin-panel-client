import { Link, useNavigate } from 'react-router-dom';
import { Avatar, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../validations/user-validations';
import { SignUpModel } from '../types/user-types';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authApi from '../store/api/userApi';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import type { ResponseErrorModel } from '../types/common-types';
import paths from '../utils/paths';

export default function SignUp() {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = authApi.useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpModel>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data).unwrap();
      toast.success('Successfully registered.');
      navigate('/auth');
    } catch (error) {
      const errorCode = (error as ResponseErrorModel).data.message;
      let errorMessage = 'Something went wrong.';
      if (errorCode === 'alreadyExist') {
        errorMessage = 'User already exist';
      } else if (errorCode === 'validationError') {
        errorMessage = 'Please provide all required fields';
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
        <TextField fullWidth label="First Name" {...register('firstName')} error={!!errors.firstName} />
        <TextField fullWidth label="Last Name" {...register('lastName')} error={!!errors.lastName} />
        <TextField fullWidth label="Email Address" {...register('email')} error={!!errors.email} />
        <TextField
          fullWidth
          label="Password"
          autoComplete="new-password"
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
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
        <TextField
          fullWidth
          error={!!errors.repeatPassword}
          label="Repeat Password"
          autoComplete="new-password"
          {...register('repeatPassword')}
          type={showRepeatPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowRepeatPassword(!showRepeatPassword)} edge="end">
                  {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <LoadingButton
          loading={isLoading}
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}>
          Sign Up
        </LoadingButton>
      </Box>
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
        <Link to={paths.auth.signIn}>{'Already have an account? Sign In'}</Link>
      </Box>
    </>
  );
}
