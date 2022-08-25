import createApp from './main'
import { renderToString } from 'vue/server-renderer'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import devalue from '@nuxt/devalue'

export default async function render(context) {
  const { instance, router, store } = createApp()
  // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready

  router.push(context.url)
  await router.isReady()
  context.store = store.state.value
  context.route = router.currentRoute.value
  // 执行asyncData(); 注意顺序与renderToString的顺序
  // await invokeAsyncData({ route: router.currentRoute.value })
  // console.log('router is already s', router.currentRoute.value.matched)
  router.currentRoute.value.matched.flatMap((record: any) => console.log(record.components))
  const appHtml = await renderToString(instance)

  return { appHtml }
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
