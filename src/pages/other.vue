<template>
  <div class="other" @click="counterStore.setName('谢大胆')">other {{ counterStore.name }}</div>
  <router-link to="/">返回</router-link>
</template>

<script setup lang="ts">
  import useCommonStore from '@/store/common'
  import { onMounted } from 'vue'

  const counterStore = useCommonStore()
  onMounted(() => {
    console.log(counterStore)
  })
</script>

<style lang="scss" scoped></style>
