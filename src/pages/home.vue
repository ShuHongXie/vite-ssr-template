<template>
  <div class="home" @click="counterStore.setName('谢小谢')">
    is home {{ res }}{{ counterStore.name }}
  </div>
  <router-link to="/other">跳转</router-link>
</template>

<script setup lang="ts">
  import useCommonStore from '@/store/common'
  import { onMounted } from 'vue'
  const res = 123
  const counterStore = useCommonStore()

  onMounted(() => {
    counterStore
  })
</script>

<style lang="scss" scoped></style>
