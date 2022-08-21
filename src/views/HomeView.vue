<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

import TodoSimpleForm from '../components/TodoSimpleForm.vue'
import TodoList from '../components/TodoList.vue'

export interface Item {
  id: number | null
  content: string
  completed: boolean
}

const itemList = ref<Item[]>([])
const searchText = ref('')

const addItem = async (item: any) => {
  try {
    const res = await axios.post('http://localhost:3000/todos', {
      content: item.content,
      completed: item.completed,
    })
    itemList.value.push(res.data)
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}
const deleteItem = (index: number) => {
  itemList.value.splice(index, 1)
}

const filteredItemList = computed(() => {
  if (searchText.value) {
    return itemList.value.filter((item) => {
      return item.content.includes(searchText.value)
    })
  }
  return itemList.value
})
</script>

<template>
  <div class="space-y-3 p-10">
    <div class="text-4xl font-bold">To Do List</div>
    <input
      class="border rounded h-10 flex-grow p-2 text-sm w-full"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <TodoSimpleForm @add-item="addItem" />
    <TodoList :itemList="filteredItemList" @delete-item="deleteItem" />
  </div>
</template>
