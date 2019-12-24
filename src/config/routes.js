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
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Dashboard',
		name: 'Dashboard',
		route: '/dashboard',
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Search',
		name: 'Search',
		route: '/search',
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Friends',
		name: 'Friends',
		route: '/friends',
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Profile',
		name: 'Profile',
		route: '/profile',
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Create Game',
		name: 'CreateGame',
		route: '/create-game',
		allowedRoles: ['admin', 'player']
	},
	{
		text: 'Game',
		name: 'Game',
		route: '/game',
		allowedRoles: ['player']
	},
	{
		text: 'Admin',
		name: 'Admin',
		route: '/admin',
		allowedRoles: ['admin']
	}
];
