import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 不限制监听数量
process.setMaxListeners(0)

// https://vitejs.dev/config/
export default defineConfig({
  build: {},
  plugins: [vue()],
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@use "@/assets/scss/element.scss" as *; @use "@/assets/scss/mixin.scss" as *; @use "@/assets/scss/constarnt.scss" as *;`
    //   }
    // }
  },
  // base: path.resolve(__dirname, './dist/'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
