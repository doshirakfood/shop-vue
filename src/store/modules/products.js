const state = () => ({
	productCategories: [
		{
			label: 'Vegetables',
			to: '/',
		},
		{
			label: 'Fresh Fruit',
			to: '/',
		},
		{
			label: 'Fish',
			to: '/',
		},
		{
			label: 'Meat',
			to: '/',
		},
		{
			label: 'Water and Drinks',
			to: '/',
		},
		{
			label: 'Snacks',
			to: '/',
		},
	],
})

export default {
	namespaced: true,
	state,
	getters: {},
	mutations: {},
}
