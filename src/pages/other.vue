<template>
  <div class="other">other {{ counterStore.name }}</div>
</template>

<script setup lang="ts">
  import useCommonStore from '@/store/common'

  const counterStore = useCommonStore()
</script>

<style lang="scss" scoped></style>
