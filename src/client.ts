// 该文件运行在浏览器中
import createApp from './main'

const { instance, router } = createApp()

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
router.isReady().then(() => {
  instance.mount("#app");
});