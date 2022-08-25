// 该文件运行在浏览器中
import devalue from '@nuxt/devalue'
import createApp from './main'
import { useApp, AppCtx } from '../server/context'

const { instance, router, store } = createApp()
let app = useApp() as AppCtx

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
app.store = store.state.value
console.log('appstore-----------', app.store)

router.isReady().then(() => {
  instance.mount('#app')
})
