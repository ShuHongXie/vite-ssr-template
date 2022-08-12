import { createRouter, createWebHashHistory } from "vue-router";

const lazyLoad = (path: string) => () => import(path)

const routes = [
  { path: '/', component:() => lazyLoad('@/pages/home.vue') },
  { path: '/about', component: () => lazyLoad('@/pages/home.vue') },
]


export default () => createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})