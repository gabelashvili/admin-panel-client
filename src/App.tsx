import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import SignIn from './components/SignIn';
import { Box, CircularProgress } from '@mui/material';
import SignUp from './components/SignUp';
import useAuthCheck from './hooks/useAuthCheck';
import Layout from './components/Layout';

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
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Route>
        </Routes>
      )}
      {!loading && isAuthed && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>qwdq</div>} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      )}
    </Box>
  );
}

export default App;
