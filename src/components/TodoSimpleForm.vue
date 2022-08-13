<script setup lang="ts">
import { ref } from 'vue'
import type { Item } from '../views/HomeView.vue'

const item = ref('')
const hasErr = ref('')

const emit = defineEmits<{
  (event: 'add-item', value: Item): void
}>()

const onSubmit = () => {
  if (!item.value) {
    checkErr()
  } else {
    emit('add-item', {
      id: Date.now(),
      content: item.value,
      completed: false,
    })
    item.value = ''
  }
}

const checkErr = () => {
  hasErr.value = '추가할 내용이 없습니다.'
}
</script>

<template>
  <form class="space-y-1" @submit.prevent="onSubmit">
    <div class="flex space-x-1">
      <input
        class="border rounded h-10 flex-grow p-2 text-sm"
        type="text"
        v-model="item"
        placeholder="추가 할 내용을 입력해주세요 :)"
      />
      <button class="bg-sky-500/70 py-1 px-3 rounded text-white" type="submit">
        Click
      </button>
    </div>
    <template v-if="hasErr">
      <div class="text-sm" style="color: red">{{ hasErr }}</div>
    </template>
  </form>
</template>
