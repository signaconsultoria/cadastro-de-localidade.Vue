import pesquisa from '@/services/pesquisa'
export default {
	async getAllPesquisa({ commit, dispatch }, payload) {
		try {
			const data = await pesquisa.getAllPesquisa(payload)
			console.log(data.data, 'nada aq')
			if (!data.data.length) {
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Nada encontrado.',
					},
					{ root: true }
				)
			}

			commit('setAllPesquisas', data.data)
			return data
		} catch (e) {
			if (e.response.data.status === 400) {
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Nada encontrado.',
					},
					{ root: true }
				)
			}
		}
	},
	getAllItemInLine({ commit }) {
		try {
			const { data } = pesquisa.getAllItemInLine()
			commit('setAllItemInLine', data)
		} catch (e) {
			throw e
		}
	},
	async getAllPesquisaCod({ commit }, id) {
		console.log(id, 'getAllPesquisaCod');
		try {
			const data = await pesquisa.getAllPesquisaCod(id)
			console.log(data, 'data')
			commit('setAllPesquisaCod', data)
		} catch (e) {
			throw e
		}
	},
	async getPesquisaLig({ commit, dispatch }, payload) {
		try {
			const { data } = await pesquisa.getPesquisaLig(payload)
			if (data[0].retorno === 10) {
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: data[0].msG_RET,
					},
					{ root: true }
				)
			} else {
				commit('setAllPesquisaLig', data)
				dispatch(
					'setSnackbar',
					{
						status: true,
						message: 'Grupo de Fornecedor Gravado com Sucesso.',
					},
					{ root: true }
				)
			}
		} catch (e) {
			throw e
		}
	},

	async getExcluirLig({ commit, dispatch }, id) {
		console.log(setxcluirLig, 'ecluir')
		try {
			await pesquisa.getExcluirLig(id)
			commit('setExcluirLig', id)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message: 'Fornecedor Excluído com Sucesso.',
				},
				{ root: true }
			)
		} catch (e) {
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:
						'Informe o Grupo.',
				},
				{ root: true }
			)
			throw e
		}
	},

	async postExcel({ commit }, payload) {
		try {
			const { data } = await pesquisa.postExcel(payload)
			const href = `${window.location.origin}/${data}`
			window.open(href)
			commit('setExcel', data)
		} catch (e) {
			throw e
		}
	},
}