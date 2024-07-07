import { Box, Button, Divider, IconButton, InputAdornment, TextField } from '@mui/material';
import UploadAvatar from './UploadAvatar';
import { useAppSelector } from '../../store/store';
import { selectAuthedUser } from '../../store/api/userApi';
import { updateDetailSchema } from '../../validations/user-validations';
import { UpdateDetailModel } from '../../types/user-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UpdateDetails = () => {
  const user = useAppSelector(selectAuthedUser)!;
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    repeatNewPassword: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    watch,
    reset,
    setValue
  } = useForm<UpdateDetailModel>({
    resolver: zodResolver(updateDetailSchema)
  });

  const handleReset = useCallback(() => {
    if (user) {
      reset({
        avatar: undefined,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        currentPassword: undefined,
        newPassword: undefined,
        repeatNewPassword: undefined
      });
    }
  }, [reset, user]);

  const onSubmit = handleSubmit((data) => {
    const reqData = Object.keys(data).reduce(
      (acc, cur) => ({ ...acc, ...(data[cur as keyof typeof data] && { [cur]: data[cur as keyof typeof data] }) }),
      {}
    ) as UpdateDetailModel;
    console.log(reqData, 22);
  });

  useEffect(() => {
    if (user) {
      handleReset();
    }
  }, [handleReset, reset, user]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box sx={{ width: '100%', display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <UploadAvatar
          currentAvatar={user.avatar}
          newAvatar={watch('avatar')}
          onChange={(file) => setValue('avatar', file, { shouldDirty: true })}
        />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField fullWidth label="First Name" {...register('firstName')} error={!!errors.firstName} />
            <TextField fullWidth label="Last Name" {...register('lastName')} error={!!errors.lastName} />
            <TextField fullWidth label="Email" {...register('email')} error={!!errors.email} />
          </Box>
          <Divider sx={{ my: 5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField
              type={showPassword.newPassword ? 'text' : 'password'}
              fullWidth
              placeholder="New Password"
              {...register('newPassword', {
                onChange: () => {
                  setValue('repeatNewPassword', '', { shouldValidate: isSubmitted });
                  setValue('currentPassword', '', { shouldValidate: isSubmitted });
                }
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })} edge="end">
                      {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.newPassword}
            />
            <TextField
              type={showPassword.repeatNewPassword ? 'text' : 'password'}
              fullWidth
              placeholder="Repeat New Password"
              {...register('repeatNewPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword({ ...showPassword, repeatNewPassword: !showPassword.repeatNewPassword })}
                      edge="end">
                      {showPassword.repeatNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.repeatNewPassword}
            />
            <TextField
              type={showPassword.currentPassword ? 'text' : 'password'}
              fullWidth
              placeholder="Current Password"
              {...register('currentPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })}
                      edge="end">
                      {showPassword.currentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.currentPassword}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ ml: 'auto' }}>
        <Button variant="contained" sx={{ mr: 2, opacity: isDirty ? 1 : 0 }} onClick={handleReset}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateDetails;
