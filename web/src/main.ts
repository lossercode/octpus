import { createApp, defineAsyncComponent } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
const pinia = createPinia()
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局注册自定义组件
const commonComponents = ['MySelect', 'EasyComponent']
// import * as CustomComponents from '@/components'
const customComponents = ['GetData', 'MutationObserver', 'Loop', 'MoveToBottom']

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
commonComponents.forEach((element) => {
  app.component(
    element,
    defineAsyncComponent(() => import(`@/components/common/${element}.vue`))
  )
})

customComponents.forEach((element) => {
  app.component(
    element,
    defineAsyncComponent(() => import(`@/components/custom/${element}.vue`))
  )
})
app.mount('#app')
