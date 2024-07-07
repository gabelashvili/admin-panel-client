import { AccountCircleOutlined } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import Section from '../components/Section';
import UpdateDetails from '../components/users/UpdateDetails';

const UserProfile = () => {
  return (
    <Container maxWidth="lg">
      <Section
        header={
          <>
            <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
              <AccountCircleOutlined />
              <Typography>Edit Profile</Typography>
            </Box>
          </>
        }>
        <Box sx={{ px: 2, display: 'flex', gap: 3, py: 5 }}>
          <UpdateDetails />
        </Box>
      </Section>
    </Container>
  );
};

export default UserProfile;
