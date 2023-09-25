import grupo from '@/services/grupo/index.js'
export default {

	async getDescLocalidade({ commit }, payload) {
		try {
			const data = await grupo.getDescLocalidade(payload)

			commit('setDescLocalidade', data.data)
		} catch (e) {
			throw e
		}
	},

	async getLocalidade({ commit }, payload) {
		try {
			const data = await grupo.getLocalidade(payload)
			console.log(data, 'dataaa')
			commit('setLocalidade', data.data)
		} catch (e) {
			throw e
		}
	},
}
