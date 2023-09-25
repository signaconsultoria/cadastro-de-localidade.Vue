import * as apiMethods from '../store'
import { parseNetworkError } from '@/utils/request'
export default {
	setLoading({ commit }, val) {
		commit('setLoading', val)
	},
	setSnackbar({ commit }, data) {
		commit('setSnackbar', data)
		commit('setSnackbarMessage', data)
	},
	setQuery({ commit }, val) {
		commit('setQuery', val)
	},
	async api(
		{ commit },
		{
			entity,
			action,
			payload = {},
			query,
			params,
			headers = {},
			loading = true,
		}
	) {
		loading && commit('SET_API_CALL_IN_PROGRESS', true)

		try {
			const response = await apiMethods[entity][action](
				{
					payload,
					query,
					params,
				},
				{ headers }
			)
			return response
		} catch (error) {
			const errorPayload = {
				[`${entity}_${action}_request`]: parseNetworkError(error),
			}
			commit('SET_GENERAL_ERRORS', errorPayload)
			throw error
		} finally {
			loading && commit('SET_API_CALL_IN_PROGRESS', false)
		}
	},
}
