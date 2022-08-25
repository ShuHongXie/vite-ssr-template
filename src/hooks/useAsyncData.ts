// import { useApp, AppCtx } from '../../server/context'
// const app = useApp() as AppCtx

import { ref } from 'vue'

export default async function useAsyncData(cb: Function) {
  const asyncData = {
    data: ref(null),
    pending: ref(false),
    error: ref(null)
  }
  console.log('execute useAsyncData')
  if (import.meta.env.SSR) {
    asyncData.data.value = cb()
    return Promise.resolve(asyncData.data)
  } else {
    return Promise.resolve(asyncData.data)
  }
}
