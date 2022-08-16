import { createSSRApp } from 'vue'
import app from './App.vue'
import createRouter from './router'
import createPinia from './store'
import useCommonStore from '@/store/common'

export default function createApp() {
  const router = createRouter()
  const store = createPinia()
  const instance = createSSRApp(app).use(router).use(store)
  useCommonStore()
  return { router, instance, store }
}
