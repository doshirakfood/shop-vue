import {
	createMemoryHistory,
	createRouter as _createRouter,
	createWebHistory,
} from 'vue-router'
import Seo from '@models/seo.js'

export function createRouter() {
	const router = _createRouter({
		history: import.meta.env.SSR
			? createMemoryHistory()
			: createWebHistory(),
		routes: [
			{
				path: '/',
				name: 'Main',
				component: () => import('@pages/main.vue'),
				meta: {
					title: 'Main',
				},
			},

			{
				path: '/develop',
				name: 'Develop',
				component: () => import('@pages/develop.vue'),
			},

			// Redirect to 404
			{
				path: '/:pathMatch(.*)*',
				name: 'Error 404',
				component: () => import('@pages/error/404.vue'),
				meta: {
					title: 'Error 404',
				},
			},
		],
		linkActiveClass: 'router-active',
		linkExactActiveClass: 'router-exact-active',
	})

	router.beforeEach((to) => {
		Seo.metaTags(to.meta || {})
	})

	return router
}
