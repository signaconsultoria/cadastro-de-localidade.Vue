import { request } from '@/utils/request'
export default {
    getDescLocalidade: () => request.get('/DescLocalidade'),
    getLocalidade: () => request.get('/localidade'),
}
