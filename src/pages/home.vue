<template>
  <div class="home" @click="counterStore.setName('谢小谢')">is home {{ counterStore.name }}</div>
  <router-link to="/other">跳转</router-link>
  <Suspense>
    <template #default>
      <div>{{ data }}</div>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
  import useCommonStore from '@/store/common'
  import useAsyncData from '@/hooks/useAsyncData'
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  console.log('开始调用')
  const router = useRoute()
  console.log(router)

  const data = await useAsyncData(() => {
    return '测试'
  })
  console.log(data)

  const counterStore = useCommonStore()
  console.log(counterStore)

  onMounted(() => {})
</script>

<style lang="scss" scoped></style>
