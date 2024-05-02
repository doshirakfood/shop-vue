const state = () => ({
	phoneList: ['(219) 555-0114'],
	email: 'Proxy@gmail.com',
	socialList: [
		{
			label: 'facebook',
			link: 'https://www.facebook.com',
			icon: 'logo-facebook',
		},

		{
			label: 'twitter',
			link: 'https://twitter.com',
			icon: 'logo-twitter',
		},

		{
			label: 'pinterest',
			link: 'https://pinterest.com',
			icon: 'logo-pinterest',
		},

		{
			label: 'instagram',
			link: 'https://www.instagram.com',
			icon: 'logo-instagram',
		},
	],
})

export default {
	namespaced: true,
	state,
	getters: {},
	mutations: {},
}
