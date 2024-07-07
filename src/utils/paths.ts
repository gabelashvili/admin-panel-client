const paths = {
  auth: { signIn: '/auth', signUp: '/auth/sign-up' },
  user: { profile: '/user/profile' },
  players: '/players',
  games: '/games'
} as const;

export default paths;
