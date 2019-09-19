/**
 * Varinats connect libraries
 * 
 * import 'vue'
 * import 'bootstrap/dist/css/bootstrap.min.css'
 * import Vue from 'vue'
 * window.Vue = require('vue')
 */

import './assets/styl/main.styl'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store'

window.Vue = require('vue')

Vue.component('app-component', require('./components/App.vue').default)

// Vue init
const app = new Vue({
    el: '#app',
    store
})