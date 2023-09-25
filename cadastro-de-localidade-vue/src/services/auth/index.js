import { request } from "@/utils/request";
export default {
    getPermissao: () => request.get("permissao"),
}