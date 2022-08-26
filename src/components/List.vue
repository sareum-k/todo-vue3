<script setup lang="ts">
withDefaults(
  defineProps<{
    itemList: any
  }>(),
  {
    itemList: [],
  }
)
</script>
<template lang="">
  <template v-for="(item, index) in itemList" :key="index">
    <slot :item="item" :index="index"></slot>
  </template>
</template>
