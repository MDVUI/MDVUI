import { createApp } from 'vue'
import MDVUI from '../packages/MDVUI/index'
import 'mdui'
import 'mdui/dist/css/mdui.min.css'
import App from './App.vue'
createApp(App).use(MDVUI).mount('#app')
