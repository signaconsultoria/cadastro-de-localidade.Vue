import { set } from '@/utils/vuex'
export default {
	setAllPesquisas: (state, data) => set((state.allPesquisas = data)),
	setAllPesquisaCod: (state, data) => { state.allPesquisaCod = data },
	setAllPesquisaLig: (state, data) => { state.setAllPesquisaLig = data },
	setExcluirLig: (state, data) => { state.excluirLig = data },
	setItemsInLine: (state, data) => { state.allItemsInLine = data },
	setExcel: (state, data) => set((state['excel'] = data)),
	setUsuarioId: (state, data) => { state.usuarioId = data },
	setStep: (state, data) => { state.step = data },
	setStepCod: (state, data) => { state.stepCode = data },
	setFilterDate: (state, data) => { state.filterDate = data }
}
