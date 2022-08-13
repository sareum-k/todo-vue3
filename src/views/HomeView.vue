<script setup lang="ts">
import { ref } from 'vue'

import TodoSimpleForm from '../components/TodoSimpleForm.vue'
import TodoList from '../components/TodoList.vue'

export interface Item {
  id: number | null
  content: string
  completed: boolean
}

const itemList = ref<Item[]>([])

const addItem = (item: any) => {
  itemList.value.push(item)
}
</script>

<template>
  <div class="space-y-3 p-10">
    <div class="text-4xl font-bold">To Do List</div>
    <TodoSimpleForm @add-item="addItem" />
    <TodoList :itemList="itemList" />
  </div>
</template>
