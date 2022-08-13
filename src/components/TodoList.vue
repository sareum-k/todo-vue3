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
    <template
      v-if="itemList.length !== 0"
      v-for="(item, index) in itemList"
      :key="index"
    >
      <div
        class="border p-3 rounded-md text-sm flex justify-between items-center"
      >
        <div class="space-x-1 flex items-center w-full">
          <input type="checkbox" v-model="item.completed" />
          <label :style="item.completed ? itemStyle : ''"
            >{{ item.content }}
          </label>
        </div>
        <button
          type="button"
          style="background-color: gray; color: white; border-radius: 5px"
          class="px-2"
          @click="deleteItem(index)"
        >
          Delete
        </button>
      </div>
    </template>
    <template v-else>
      <div>To Do List가 없습니다!</div>
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
const itemList: Item[] = ref([])
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

const deleteItem = (index: number) => {
  itemList.value.splice(index, 1)
}
</script>
