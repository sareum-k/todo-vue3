<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from '@/hooks/toast'
import { useRouter } from 'vue-router'

import TodoList from '@/components/TodoList.vue'
import Pagination from '@/components/Pagination.vue'
import Toast from '@/components/Toast.vue'

export interface Item {
  id: number | null
  content: string
  completed: boolean
}

const router = useRouter()
const itemList = ref<Item[]>([])
const searchText = ref<string>('')
const numberOfItems = ref<string | number>(0)
const limit: number = 5
const currentPage = ref<number>(1)

const { showToast, toastMessage, toastType, triggerToast } = useToast()

const getItemList = async (page = currentPage.value) => {
  currentPage.value = page
  try {
    const res = await axios.get(
      `http://localhost:3000/todos?content_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`
    )
    numberOfItems.value = res.headers['x-total-count']
    itemList.value = res.data
  } catch (err) {
    triggerToast('에러가 있습니다. 관리자에게 문의해주세요!', '')
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
    triggerToast('에러가 있습니다. 관리자에게 문의해주세요!', '')
    console.log(err)
  }
}

const updateItem = async (index: number, checked: boolean) => {
  const id = itemList.value[index].id
  try {
    await axios.patch(`http://localhost:3000/todos/${id}`, {
      completed: checked,
    })
    itemList.value[index].completed = checked
  } catch (err) {
    triggerToast('에러가 있습니다. 관리자에게 문의해주세요!', '')
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

const moveToCreatePage = () => {
  router.push({
    name: 'todos-create',
  })
}
</script>

<template>
  <Toast v-if="showToast" :message="toastMessage" :type="toastType" />
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-4xl font-bold">To Do List</div>
      <button
        type="button"
        class="bg-green-500 px-3 py-1 rounded text-white"
        @click="moveToCreatePage()"
      >
        Todo 추가
      </button>
    </div>
    <input
      class="border rounded h-10 p-2 text-sm w-full"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchEnter()"
    />
    <hr />
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
