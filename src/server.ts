import createApp from './main'
import { renderToString } from '@vue/server-renderer'
import { RouteLocationNormalizedLoaded } from 'vue-router'
// import serialize from "serialize-javascript";

export default async function render(url: string) {
  const { instance, router } = createApp()
  // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
  await router.isReady()
  // 执行asyncData(); 注意顺序与renderToString的顺序
  await invokeAsyncData({ route: router.currentRoute.value })

  const ctx = {}
  const html = await renderToString(instance, ctx)
  return { html }
}

async function invokeAsyncData({ route }: { route: RouteLocationNormalizedLoaded }) {
  return Promise.allSettled(
    route.matched.map(({ components }) => {
      console.log(components)

      // let asyncData = components.default.asyncData || false;
      // return asyncData && asyncData({ store, route });
    })
  )
}
