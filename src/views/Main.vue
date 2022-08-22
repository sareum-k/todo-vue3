<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'

import TodoSimpleForm from '../components/TodoSimpleForm.vue'
import TodoList from '../components/TodoList.vue'
import Pagination from '../components/Pagination.vue'

export interface Item {
  id: number | null
  content: string
  completed: boolean
}

const itemList = ref<Item[]>([])
const searchText = ref<string>('')
const numberOfItems = ref<string | number>(0)
const limit: number = 10
const currentPage = ref<number>(1)

const addItem = async (item: any) => {
  try {
    await axios.post('http://localhost:3000/todos', {
      content: item.content,
      completed: item.completed,
    })
    getItemList(currentPage.value)
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

const getItemList = async (page = currentPage.value) => {
  currentPage.value = page
  try {
    const res = await axios.get(
      `http://localhost:3000/todos?content_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
    )
    numberOfItems.value = res.headers['x-total-count']
    itemList.value = res.data
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

getItemList()

const deleteItem = async (index: number) => {
  const id = itemList.value[index].id
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`)
    getItemList(currentPage.value)
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

const updateItem = async (index: number) => {
  const id = itemList.value[index].id
  try {
    await axios.patch(`http://localhost:3000/todos/${id}`, {
      completed: !itemList.value[index].completed,
    })
    itemList.value[index].completed = !itemList.value[index].completed
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

let timeout: null | number = null

const searchEnter = () => {
  clearTimeout(timeout!)
  getItemList(1)
}

watch(searchText, () => {
  clearTimeout(timeout!)
  timeout = setTimeout(() => {
    getItemList(1)
  }, 800)
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
      @keyup.enter="searchEnter()"
    />
    <TodoSimpleForm @add-item="addItem" />
    <TodoList
      :itemList="itemList"
      @delete-item="deleteItem"
      @toggle-item="updateItem"
    />
    <div class="flex justify-center">
      <Pagination
        :numberOfItems="numberOfItems"
        :limit="limit"
        :currentPage="currentPage"
        @change-page="getItemList"
      />
    </div>
  </div>
</template>
