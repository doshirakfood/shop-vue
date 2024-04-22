import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { RouterLink } from 'vue-router'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { createRouter } from './router'
import Store from './store'
import './assets/css/style.scss'

// components
import SvgIcon from '@components/SvgIcon.vue'

const router = createRouter()
const head = createHead()
const store = Store
const app = createApp(App)

// components
app.component('RouterLink', RouterLink)
app.component('SvgIcon', SvgIcon)

app.use(router)
app.use(head)
app.use(store)
app.mount('#app')
