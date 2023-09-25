import { get } from "@/utils/vuex"
export default {
    getInserir: state => state.inserir,
    getExcluir: state => state.excluir,
    idUsuarioId: state => state.idUsuarioId,
    usarioInsert: state => state.usarioInsert,
    getUsuario: state => state.usuario,
    getUserStep: state => state.userStep,
    getUserState: state => state.userState,
    getListInLine: state => state.listInLine,
    getData: state => state.data
}