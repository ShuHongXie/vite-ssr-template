import { acceptHMRUpdate, defineStore } from 'pinia'

const useCommonStore = defineStore('common', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: 'Eduardo',
      isAdmin: true
    }
  },
  actions: {
    async setName(newName) {
      this.name = newName
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}

export default useCommonStore
