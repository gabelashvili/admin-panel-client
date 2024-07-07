const paths = {
  home: '/',
  auth: { signIn: '/auth', signUp: '/auth/sign-up' },
  user: { profile: '/user/profile' },
} as const;

export default paths;
