import 'reflect-metadata'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { createPinia } from 'pinia'
import App from './app.vue'
import '~/config/styles/index.css'
import 'bulma/css/bulma.css'

const router = createRouter({
	history: createWebHistory(),
	routes,
})

const store = createPinia()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
