import { set } from "@/utils/vuex"
export default {
    setDescLocalidade(state, data) { state.descLocalidade = data },
    setLocalidade(state, data) { state.localidade = data },
    setStep(state, data) { state.step = data },
    setFaixaLoc(state, data) { state.faixaLoc = data }

}