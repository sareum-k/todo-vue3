<template>
  <div class="space-y-3 p-10">
    <div class="text-4xl font-bold">To Do List</div>
    <form class="space-y-1" @submit.prevent="addItem">
      <div class="flex space-x-1">
        <input
          class="border rounded h-10 flex-grow p-2 text-sm"
          type="text"
          v-model="item"
          placeholder="추가 할 내용을 입력해주세요 :)"
        />
        <button
          class="bg-sky-500/70 py-1 px-3 rounded text-white"
          type="submit"
        >
          Click
        </button>
      </div>
      <template v-if="hasErr">
        <div class="text-sm" style="color: red">{{ hasErr }}</div>
      </template>
    </form>
    <template v-for="(item, index) in itemList" :key="index">
      <div
        class="border p-3 py-2 rounded-md text-sm space-x-1 flex flex-col items-center"
      >
        <input type="checkbox" v-model="item.completed" />
        <label :style="item.completed ? itemStyle : ''">{{
          item.content
        }}</label>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: number
  content: string
  completed: boolean
}

const item = ref('')
const itemList = ref([])
const hasErr = ref('')
const itemStyle = {
  textDecoration: 'line-through',
  color: 'gray',
}

const addItem = () => {
  if (!item.value) {
    checkErr()
  } else {
    itemList.value.push({
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
