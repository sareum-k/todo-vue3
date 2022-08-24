<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.id)
console.log(route.params)
</script>

<template>
  <div>Todo Id page</div>
</template>
