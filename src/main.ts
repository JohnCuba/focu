import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { createPinia } from 'pinia'
import App from './app.vue'
import '~/config/styles/index.css'
import { piniaInitCbPlugin } from './lib/pinia_init_cb_plugin'

const router = createRouter({
	history: createWebHistory(),
	routes,
})
const store = createPinia()
const app = createApp(App)

store.use(piniaInitCbPlugin)
app.use(router)
app.use(store)
app.mount('#app')
