<template>
  <div class="space-y-3 p-10">
    <div class="text-4xl font-bold">To Do List</div>
    <form class="space-x-1 flex" @submit.prevent="addItem">
      <input
        class="border rounded h-10 flex-grow p-2 text-sm"
        type="text"
        v-model="item"
        placeholder="추가 할 내용을 입력해주세요 :)"
      />
      <button class="bg-sky-500/70 py-1 px-3 rounded text-white" type="submit">
        Click
      </button>
    </form>
    <template v-for="(item, index) in itemList" :key="index">
      <div class="border p-3 py-2 rounded-md text-sm">
        {{ item.content }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const item = ref('')
const itemList = ref([
  { id: 1, content: '30분 일찍 기상하기' },
  { id: 2, content: '30분 이상 걷기' },
])

const addItem = () => {
  itemList.value.push({
    id: Date.now(),
    content: item.value,
  })
  item.value = ''
}
</script>
