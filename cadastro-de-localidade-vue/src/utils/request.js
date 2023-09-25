import axios from 'axios'
import { DEFAULT_API_URLS } from './enum'
import { getStorage } from './storage'

const { stringify, parse } = JSON
export const parseNetworkError = error => parse(stringify(error))

const withBaseURLContext = () =>
	process.env.NODE_ENV
		? DEFAULT_API_URLS[process.env.NODE_ENV.toUpperCase()]
		: DEFAULT_API_URLS.development

const request = axios.create({
	baseURL: withBaseURLContext(),
	headers: {
		UsuarioId: process.env.NODE_ENV === 'production' ? getStorage('usuarioId') : 1,
		GrupoUsuarioId: process.env.NODE_ENV === 'production' ? getStorage('GrupoUsuarioId') : 1,
		EmpresaId: process.env.NODE_ENV === 'production' ? getStorage('EmpresaId') : 1,
	},
})

// request.interceptors.request.use(
// 	config => {
// 		const token = getStorage('token')
		
// 		if (token) {
// 			config.headers.common.Authorization = `Bearer ${token}`
// 		}
// 		return config
// 	},
// 	response => Promise.reject(response)
// )
request.interceptors.response.use(
	response => {
		return response
	},
	error => Promise.reject(error)
)

export { request }
