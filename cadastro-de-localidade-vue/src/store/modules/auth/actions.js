import auth from '@/services/auth/index.js'
export default {
	async getPermissao({ commit }) {
		try {
			const { data } = await auth.getPermissao()
			commit('setToken', data.token)

			window.localStorage.setItem('token', data.token)
		} catch (e) {
			throw e
		}
	},
}
