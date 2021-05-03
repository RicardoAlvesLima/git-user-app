import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuesax from 'vuesax'
import App from './App.vue'

import 'vuesax/dist/vuesax.css'

import store from './store'

import './assets/style/main.css'
import 'tailwindcss/tailwind.css'
import 'boxicons'
import Icon from './components/Icon'

Vue.config.productionTip = false

Vue.component('icon', Icon)
Vue.use(VueAxios, axios)

Vue.use(Vuesax, {
    colors: {
        primary: '#FF6501',
        secondary: '#C9BEA5',
        dark: '#2D2834'
    }
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
