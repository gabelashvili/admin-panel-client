import { useCallback, useEffect, useState } from 'react';
import authApi, { selectAuthedUser } from '../store/api/userApi';
import { useAppSelector } from '../store/store';

const useAuthCheck = () => {
  const authedUser = useAppSelector(selectAuthedUser);
  const [pingUser] = authApi.usePingUserMutation();
  const [getAuthedUser] = authApi.useLazyAuthedUserQuery();
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!accessToken || !refreshToken) {
      setLoading(false);
      return;
    }
    try {
      await pingUser();
      await getAuthedUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [getAuthedUser, pingUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { loading, isAuthed: !!authedUser };
};

export default useAuthCheck;
