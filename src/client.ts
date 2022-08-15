// 该文件运行在浏览器中
import devalue from '@nuxt/devalue'
import createApp from './main'

const { instance, router, store } = createApp()

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
console.log(window.__pinia, window.__INITIAL_STATE__, store.state.value)
// store.state.value = window.__INITIAL_STATE__ || ({} as any)
router.isReady().then(() => {
  instance.mount('#app')
})
