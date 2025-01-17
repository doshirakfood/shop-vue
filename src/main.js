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
import VButton from '@ui/button/button.vue'
import VField from '@ui/field/field.vue'
import VSelect from '@ui/select/select.vue'
import VDropdown from '@ui/dropdown/dropdown.vue'

// elements
import Logotype from '@components/logotype/logotype.vue'
import Price from '@components/price/price.vue'

const router = createRouter()
const head = createHead()
const store = Store
const app = createApp(App)

// components
app.component('RouterLink', RouterLink)
app.component('SvgIcon', SvgIcon)
app.component('VButton', VButton)
app.component('VField', VField)
app.component('VSelect', VSelect)
app.component('VDropdown', VDropdown)

// elements
app.component('Logotype', Logotype)
app.component('Price', Price)

app.use(router)
app.use(head)
app.use(store)
app.mount('#app')
