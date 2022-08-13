<script setup lang="ts">
import { ref } from 'vue'

import TodoSimpleForm from '../components/TodoSimpleForm.vue'

export interface Item {
  id: number
  content: string
  completed: boolean
}

const itemList = ref<Item[]>([])
const itemStyle = {
  textDecoration: 'line-through',
  color: 'gray',
}

const addItem = (item: any) => {
  itemList.value.push(item)
}

const deleteItem = (index: number) => {
  itemList.value.splice(index, 1)
}
</script>

<template>
  <div class="space-y-3 p-10">
    <div class="text-4xl font-bold">To Do List</div>
    <TodoSimpleForm @add-item="addItem" />
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
