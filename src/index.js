/**
 * Varinats connect libraries
 * 
 * import 'vue'
 * import 'bootstrap/dist/css/bootstrap.min.css'
 * import Vue from 'vue'
 * window.Vue = require('vue')
 */
import Vue from 'vue'
import './assets/styl/main.styl'
import './js/main.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import store from './store'

// Vue.component('app-component', require('./components/App.vue').default)

// Vue init
new Vue({
    el: '#app',
    store,
    render: h => h(App)
})