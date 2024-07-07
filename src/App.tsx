import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import SignIn from './components/SignIn';
import { Box, CircularProgress } from '@mui/material';
import SignUp from './components/SignUp';
import useAuthCheck from './hooks/useAuthCheck';
import Layout from './components/Layout';
import paths from './utils/paths';
import UserProfile from './pages/UserProfile';
import Games from './pages/Games';

function App() {
  const { loading, isAuthed } = useAuthCheck();

  return (
    <Box>
      {loading && (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && !isAuthed && (
        <Routes>
          <Route path={paths.auth.signIn} element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route path={paths.auth.signUp} element={<SignUp />} />
          </Route>
          <Route path="*" element={<Navigate to={paths.auth.signIn} />} />
        </Routes>
      )}
      {!loading && isAuthed && (
        <Routes>
          <Route path={paths.home} element={<Layout />}>
            <Route index element={<div>test</div>} />
            <Route path={paths.user.profile} element={<UserProfile />} />
            <Route path={paths.games} element={<Games />} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      )}
    </Box>
  );
}

export default App;
