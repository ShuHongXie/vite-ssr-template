import { getContext } from 'unctx'

export type AppCtx = {
  store?: any
  url?: string
}

// let appCtx: AppCtx = {}
let appCtx = getContext<AppCtx>('app')
appCtx.set({})
export function useApp() {
  let appInstance = appCtx.tryUse()
  return appInstance
}
