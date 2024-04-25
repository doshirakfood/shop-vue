import * as Vuex from 'vuex'
import main from './modules/default'
import contacts from './modules/contacts'
import products from './modules/products'

export default new Vuex.Store({
	modules: {
		main: main,
		contacts: contacts,
		products: products,
	},
})
