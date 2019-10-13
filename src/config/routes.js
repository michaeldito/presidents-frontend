export default [
	{
		text: 'Landing Page',
		name: 'LandingPage',
		route: '/',
		private: true,
		exact: true,
	},
	{
		text: 'Inbox',
		name: 'Inbox',
		route: '/inbox',
		private: false
	},
	{
		text: 'Dashboard',
		name: 'Dashboard',
		route: '/dashboard',
		private: false
	},
	{
		text: 'Search',
		name: 'Search',
		route: '/search',
		private: false
	},
	{
		text: 'Friends',
		name: 'Friends',
		route: '/friends',
		private: false
	},
	{
		text: 'Profile',
		name: 'Profile',
		route: '/profile',
		private: false
	},
	{
		text: 'Create Game',
		name: 'CreateGame',
		route: '/create-game',
		private: false
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
		text: 'Register',
		name: 'Register',
		route: '/register',
		publicOnly: true,
	}
]