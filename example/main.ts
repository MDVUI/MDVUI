import { createApp } from 'vue'
import 'mdui'
import 'mdui/dist/css/mdui.min.css'
import MDVUI from '../packages/MDVUI/index'
import '@mdvui/styles/index.scss'
import App from './App.vue'

createApp(App).use(MDVUI).mount('#app')
