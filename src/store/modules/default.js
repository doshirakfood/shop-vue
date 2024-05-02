const state = () => ({
	siteName: import.meta.env.VITE_SITE_NAME,
	location: 'Lincoln- 344, Illinois, Chicago, USA',

	currency: {
		value: 'USD',
		symbol: '$',
	},
	currencyList: [
		{
			value: 'USD',
			symbol: '$',
		},

		{
			value: 'EUR',
			symbol: '€',
		},

		{
			value: 'RUB',
			symbol: '₽',
		},
	],

	lang: {
		value: 'Eng',
	},
	langList: [
		{
			value: 'Eng',
		},

		{
			value: 'Spain',
		},

		{
			value: 'Rus',
		},
	],

	shoppingCart: {
		sum: 57.0,
		count: 2,
	},

	currentYear: new Date().getFullYear(),
})

const mutations = {
	changeCurrency(state, currency) {
		state.currency = currency
	},

	changeLang(state, lang) {
		state.lang = lang
	},
}

export default {
	namespaced: true,
	state,
	getters: {},
	mutations,
}
