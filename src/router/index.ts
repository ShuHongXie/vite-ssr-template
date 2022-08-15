import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('../pages/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = (path.match(/\.\/pages(.*)\.vue$/) as string[])[1].toLowerCase()
  return {
    path: name === '/home' ? '/' : name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})

export default () =>
  createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes // `routes: routes` 的缩写
  })
