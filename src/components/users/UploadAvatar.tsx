import { CameraAlt } from '@mui/icons-material';
import { Box, Typography, alpha, styled } from '@mui/material';
import { toast } from 'react-toastify';
import { UserModel } from '../../types/user-types';

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0
});

const UploadAvatar = ({
  currentAvatar,
  newAvatar,
  onChange
}: {
  currentAvatar: UserModel['avatar'];
  newAvatar?: File;
  onChange: (file: File) => void;
}) => {
  const handleUpload = (file?: File) => {
    if (!file) {
      return;
    }
    if (file.size / (1024 * 1024) > 3) {
      toast.error('Max allowed filed size 3MB');
      return;
    }
    onChange(file);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        minWidth: 340,
        height: 'fit-content'
      }}>
      <Box
        sx={{
          width: 144,
          height: 144,
          borderRadius: '50%',
          border: (theme) => `1px dotted ${theme.palette.divider}`,
          p: 1,
          cursor: 'pointer'
        }}>
        {(currentAvatar || newAvatar) && (
          <Box sx={{ position: 'relative', width: '100%', height: '100%', '&:hover>div': { opacity: 1 } }}>
            <Box
              component={'img'}
              src={newAvatar ? URL.createObjectURL(newAvatar) : currentAvatar || ''}
              sx={{ width: '100%', height: '100%', borderRadius: '50%' }}></Box>
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: alpha('#000000', 0.4),
                borderRadius: '50%',
                top: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 0.5,
                opacity: 0,
                transition: 'all 0.1s'
              }}>
              <CameraAlt sx={() => ({ fill: 'white' })} />
              <Typography sx={{ fontSize: 13, color: () => 'white' }}>Upload Photo</Typography>
              <VisuallyHiddenInput
                onChange={(e) => {
                  handleUpload(e.target?.files?.[0]);
                  e.target.value = '';
                }}
                accept="image/png, image/jpg, image/jpeg"
                type="file"
              />
            </Box>
          </Box>
        )}
        {!currentAvatar && !newAvatar && (
          <Box
            sx={(theme) => ({
              bgcolor: theme.palette.grey[100],
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 0.5,
              transition: 'all 0.1s',
              '&:hover': {
                opacity: 0.7
              },
              position: 'relative'
            })}>
            <CameraAlt sx={(theme) => ({ fill: theme.palette.text.disabled })} />
            <Typography sx={{ fontSize: 13, color: (theme) => theme.palette.text.secondary }}>Upload Photo</Typography>
            <VisuallyHiddenInput
              onChange={(e) => {
                handleUpload(e.target?.files?.[0]);
                e.target.value = '';
              }}
              accept="image/png, image/jpg, image/jpeg"
              type="file"
            />
          </Box>
        )}
      </Box>
      <Typography sx={{ fontSize: 12, color: (theme) => theme.palette.text.secondary }}>
        Allowed *.jpeg, *.jpg, *.png max size of 3 Mb
      </Typography>
    </Box>
  );
};

export default UploadAvatar;
