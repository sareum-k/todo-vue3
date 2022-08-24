<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

const route = useRoute()
const router = useRouter()
const item = ref<any>(null)
const originalItem = ref<any>(null)
const loading = ref<boolean>(true)

const getTodo = async () => {
  loading.value = true
  try {
    const res = await axios.get(
      `http://localhost:3000/todos/${route.params.id}`
    )
    item.value = { ...res.data }
    originalItem.value = { ...res.data }
    loading.value = false
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

getTodo()

const updatedItem = computed(() => {
  return !_.isEqual(item.value, originalItem.value)
})

const updateState = () => {
  item.value.completed = !item.value.completed
}

const moveToListPage = () => {
  router.push({
    name: 'todos',
  })
}

const updateItemData = async () => {
  try {
    await axios.put(`http://localhost:3000/todos/${item.value.id}`, {
      content: item.value.content,
      completed: item.value.completed,
    })
    router.push({
      name: 'todos',
    })
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}
</script>

<template>
  <div>
    <div class="text-4xl font-bold pb-10">To-Do Page</div>
    <div v-if="loading">loading</div>
    <div v-else class="flex space-x-10">
      <div class="w-full">
        <form class="space-y-2" @submit.prevent="updateItemData">
          <label>Todo Content</label>
          <input
            type="text"
            v-model="item.content"
            class="border rounded w-full h-8 pl-2 text-gray-500 text-sm"
          />
          <div class="space-x-2 flex justify-end">
            <button
              type="submit"
              class="rounded bg-[#cdf0ea] px-3 py-1 text-sm"
              :disabled="!updatedItem"
            >
              저장
            </button>
            <button
              type="button"
              class="rounded border px-3 py-1 text-sm"
              @click="moveToListPage"
            >
              취소
            </button>
          </div>
        </form>
      </div>
      <div class="space-y-2">
        <label>State</label>
        <div>
          <button
            type="button"
            class="rounded text-white px-3 py-1 text-sm"
            :class="item.completed ? 'bg-[#3ec70b]' : 'bg-[#E64848]'"
            @click="updateState"
          >
            {{ item.completed ? 'Completed' : 'Incompleted' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
