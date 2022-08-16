<template>
  <div class="other">other {{ counterStore.name }}</div>
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
