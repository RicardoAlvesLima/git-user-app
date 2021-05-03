import Vue from 'vue'
import Vuex, {createLogger} from 'vuex'
import user from '../store/user/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
