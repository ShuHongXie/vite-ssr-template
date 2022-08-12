

export default async function useAsyncData(cb: Function) {
  if(typeof cb !== 'function') {
    throw Error('cb must be a function')
    return false
  }
  const data = await cb()
  return data
}