export default [
	{
		text: 'Welcome',
		name: 'Welcome',
		route: '/',
		private: true,
		exact: true,
	},
	{
		text: 'Create Game',
		name: 'CreateGame',
		route: '/create-game',
		private: true
	},
	{
		text: 'Join Game',
		name: 'JoinGame',
		route: '/join-game',
		private: true
	},
	{
		text: 'Game',
		name: 'Game',
		route: '/game',
		private: true
	},
	{
		text: 'Login',
		name: 'Login',
		route: '/login',
		publicOnly: true,
	},
	{
		text: 'Create Account',
		name: 'CreateAccount',
		route: '/create-account',
		publicOnly: true,
	}
]