import { request } from "@/utils/request"
export default {
        getAllPesquisa: (payload) => request.get(`Pesquisa?CEP=${payload.cep}`),
        getAllPesquisaCod: (id) => request.get(`PesquisaCod?id=${id}`),




}


