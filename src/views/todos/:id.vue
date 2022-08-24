<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const item = ref<any>(null)
const loading = ref<boolean>(true)

const incompleted = {
  backgroundColor: '#E64848',
}

const completed = {
  backgroundColor: '#3ec70b',
}

const getTodo = async () => {
  loading.value = true
  try {
    const res = await axios.get(
      `http://localhost:3000/todos/${route.params.id}`
    )
    item.value = res.data
    loading.value = false
  } catch (err) {
    alert('에러가 있습니다. 관리자에게 문의해주세요!')
    console.log(err)
  }
}

getTodo()

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
    <div class="text-4xl font-bold" style="padding-bottom: 2rem">
      To-Do Page
    </div>
    <div v-if="loading">loading</div>
    <div v-else class="flex space-x-2">
      <div>
        <form class="space-y-2" @submit.prevent="updateItemData">
          <label style="font-size: 1rem">Todo Content</label>
          <input
            type="text"
            v-model="item.content"
            class="border rounded w-full"
            style="height: 2rem; padding-left: 0.5rem; color: gray"
          />
          <div class="space-x-2">
            <button
              type="submit"
              class="rounded"
              style="
                background-color: #cdf0ea;
                padding: 0.3rem 0.8rem;
                font-size: 0.8rem;
              "
            >
              저장
            </button>
            <button
              type="button"
              class="rounded border"
              style="padding: 0.3rem 0.8rem; font-size: 0.8rem"
              @click="moveToListPage"
            >
              취소
            </button>
          </div>
        </form>
      </div>
      <div class="space-y-2">
        <label style="font-size: 1rem">State</label>
        <div>
          <button
            type="button"
            class="rounded text-white"
            style="
              padding: 0.3rem 0.8rem;
              font-size: 0.8rem;
              background-color: #3ec70b;
            "
            :style="item.completed ? completed : incompleted"
            @click="updateState"
          >
            {{ item.completed ? 'Completed' : 'Incompleted' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
