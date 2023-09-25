import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/Home'),
	},
	{
		path: '/pesquisa',
		name: 'pesquisa',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/pesquisa'),
	},
	{
		path: '/TableAll',
		name: 'tableAll',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/TableAll'),
	},
	{
		path: '/FaixaCep',
		name: 'FaixaCep',
		component: () => import(/* webpackChunkName: "home" */ '@/pages/FaixaCep'),
		props: route => ({ query: route.query.q }),

	},
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
