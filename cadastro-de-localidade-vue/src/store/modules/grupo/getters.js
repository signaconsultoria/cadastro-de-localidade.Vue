import { get } from "@/utils/vuex"
export default {
  getDescLocalidade: state => state.descLocalidade,
  getLocalidade: state => state.localidade,
  getStep: state => state.step,
  getFaixaLoc: state => state.faixaLoc

}