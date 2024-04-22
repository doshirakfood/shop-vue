const state = () => ({
	siteName: import.meta.env.VITE_SITE_NAME,
})

export default {
	namespaced: true,
	state,
	getters: {},
	mutations: {},
}
