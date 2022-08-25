<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string
    type: string
  }>(),
  {
    message: '',
    type: 'success',
  }
)
</script>
<template>
  <div
    class="w-auto h-auto row-auto py-2 px-8 text-sm bg-green-200/60 text-green-800 absolute right-5 top-20"
    :class="type === 'success' ? '' : 'bg-red-600/20 text-red-800'"
    role="alert"
  >
    {{ message }}
  </div>
</template>
