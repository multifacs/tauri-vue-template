import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.postcss'
import bootstrap from "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

createApp(App).use(router).use(store).mount('#app')
