const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up' },
  dashboard: {
    players: '/players'
  }
} as const;

export default paths;
