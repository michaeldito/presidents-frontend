module.exports.public = [
	{
		text: 'Landing Page',
		name: 'LandingPage',
		route: '/',
		exact: true,
	},
	{
		text: 'Login',
		name: 'Login',
		route: '/login',
	},
	{
		text: 'Register',
		name: 'Register',
		route: '/register',
	}
];

module.exports.private = [
	{
		text: 'Inbox',
		name: 'Inbox',
		route: '/inbox',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Dashboard',
		name: 'Dashboard',
		route: '/dashboard',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Search',
		name: 'Search',
		route: '/search',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Friends',
		name: 'Friends',
		route: '/friends',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Profile',
		name: 'Profile',
		route: '/profile',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Create Game',
		name: 'CreateGame',
		route: '/create-game',
		allowedRoles: ['Admin', 'Player']
	},
	{
		text: 'Game',
		name: 'Game',
		route: '/game',
		allowedRoles: ['Player']
	},
	{
		text: 'Admin',
		name: 'Admin',
		route: '/admin',
		allowedRoles: ['Admin']
	}
];
