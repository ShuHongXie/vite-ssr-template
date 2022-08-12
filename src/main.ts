import { createSSRApp } from 'vue'
import app from './App.vue'
import createRouter from './router'

export default function createApp() {
  const router = createRouter()
  const instance = createSSRApp(app).use(router)
  return { router, instance }
}