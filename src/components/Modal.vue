<script setup lang="ts">
const emit = defineEmits<{
  (event: 'onClose'): void
  (event: 'onDelete'): void
}>()
</script>
<template>
  <div
    class="fixed top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center"
  >
    <div class="px-8 py-5 w-2/5 h-1/4 bg-white absolute space-y-9">
      <div class="space-y-2">
        <div class="text-lg font-semibold text-left">Todo 삭제</div>
        <hr class="border-green-500/50" />
      </div>
      <div class="text-center">정말 삭제하시겠습니까?</div>
      <div class="flex justify-end items-center space-x-2">
        <button
          type="button"
          class="text-sm bg-green-500 border-green-500 border px-3 py-[0.2rem] rounded text-white"
          @click="emit('onDelete')"
        >
          확인
        </button>
        <button
          type="button"
          class="text-sm border-green-500 text-green-900 px-3 py-[0.2rem] rounded border"
          @click="emit('onClose')"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>
