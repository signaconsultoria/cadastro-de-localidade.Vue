import { set } from '@/utils/vuex'
export default
    {
        setToken: (state, data) => set((state['token'] = data)),
    }
