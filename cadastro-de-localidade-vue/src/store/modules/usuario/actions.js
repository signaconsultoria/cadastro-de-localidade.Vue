import usuario from '@/services/usuario/index.js'
export default {

	async getInserir2({ commit, dispatch }, payload) {
		try {
			const { data } = await usuario.getInserir2(payload)
			commit('setInserir2', data)
			console.log(data[0], 'data')

			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Inclusão efetuada com sucesso.',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Informe uma Localidade.',
				},
				{ root: true }
			)
			throw e
		}
	},

	async getExcluir({ commit, dispatch }, id) {
		console.log(id, 'id')
		try {
			await usuario.getExcluir(id)
			commit('setExcluir', id)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Exclusão efetuada com sucesso.',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Informe uma Localidade.',
				},
				{ root: true }
			)
			throw e
		}
	},
}
