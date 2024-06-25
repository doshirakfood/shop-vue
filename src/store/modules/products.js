const state = () => ({
	productCategories: [
		{
			label: 'Vegetables',
			path: '/',
		},
		{
			label: 'Fresh Fruit',
			path: '/',
		},
		{
			label: 'Fish',
			path: '/',
		},
		{
			label: 'Meat',
			path: '/',
		},
		{
			label: 'Water and Drinks',
			path: '/',
		},
		{
			label: 'Snacks',
			path: '/',
		},
	],
})

export default {
	namespaced: true,
	state,
	getters: {},
	mutations: {},
}
