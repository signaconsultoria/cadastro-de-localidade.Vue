import { get } from '@/utils/vuex'
import state from './state'
export default {
	getAllPesquisa: (state) => state.allPesquisas,
	allPesquisaCod: (state) => state.allPesquisaCod,
	allPesquisaLig: (state) => state.allPesquisaLig,
	excluirLig: (state) => state.allExcluirLig,
	allItemsInLine: (state) => state.allItemsInLine,
	usuarioId: (state) => state.usuarioId,
	getStep: (state) => state.step,
	getStepCode: (state) => state.stepCode,
	getFilterDate: (state) => state.filterDate

}
