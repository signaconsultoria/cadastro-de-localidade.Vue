import { request } from '../../utils/request'
export default {
	getInserir: (payload) => request.post(`Cad`, payload),
	getInserir2: (payload) => request.post(`CadCep`, payload),
	getExcluir: (id) => request.delete(`Cad/${id}`),
	getExcluir2: (id) => request.delete(`CadCep/${id}`),

}

