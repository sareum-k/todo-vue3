<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'
import { useToast } from '@/hooks/toast'

import Toast from '@/components/Toast.vue'

const props = withDefaults(
  defineProps<{
    editing: boolean
  }>(),
  {
    editing: false,
  }
)

const route = useRoute()
const router = useRouter()
const item = ref<any>({
  content: '',
  completed: false,
  body: '',
})
const originalItem = ref<any>(null)
const loading = ref<boolean>(false)

const { showToast, toastMessage, toastType, triggerToast } = useToast()

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
    loading.value = false
    triggerToast('에러가 있습니다. 관리자에게 문의해주세요!', '')
    console.log(err)
  }
}

if (props.editing) {
  getTodo()
}

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
  if (!item.value.content) {
    triggerToast('Todo에 입력한 내용이 없습니다!', '')
    return
  }
  try {
    let res
    const data = {
      content: item.value.content,
      completed: item.value.completed,
      body: item.value.body,
    }
    if (props.editing) {
      res = await axios.put(
        `http://localhost:3000/todos/${item.value.id}`,
        data
      )
      triggerToast('성공적으로 수정되었습니다!', 'success')
    } else {
      res = await axios.post(`http://localhost:3000/todos`, data)
      triggerToast('성공적으로 생성되었습니다!', 'success')
      setTimeout(() => {
        router.push({
          name: 'todos',
        })
      }, 2000)
    }
  } catch (err) {
    triggerToast('에러가 있습니다. 관리자에게 문의해주세요!', '')
    console.log(err)
  }
}
</script>

<template>
  <div>
    <Toast v-if="showToast" :message="toastMessage" :type="toastType" />
    <div v-if="loading">loading</div>
    <div v-else class="space-x-10">
      <div class="w-full">
        <form class="space-y-5" @submit.prevent="updateItemData">
          <div class="flex justify-between">
            <div class="space-y-2 w-3/4">
              <label class="font-semibold">Todo</label>
              <div>
                <input
                  type="text"
                  v-model="item.content"
                  placeholder="추가 할 내용을 입력해주세요 :)"
                  class="border rounded w-full h-8 pl-2 text-gray-500 text-sm"
                />
              </div>
            </div>
            <div v-if="editing" class="space-y-2">
              <label class="font-semibold">State</label>
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
          <div class="space-y-2">
            <label class="font-semibold">추가 설명</label>
            <div>
              <textarea
                class="border w-full text-sm px-2 py-1"
                v-model="item.body"
                rows="10"
                placeholder="추가 설명하고 싶은 내용을 입력해주세요!"
              />
            </div>
          </div>
          <div class="space-x-2 flex justify-end">
            <button
              type="submit"
              class="rounded bg-[#cdf0ea] px-3 py-1 text-sm"
              :disabled="!updatedItem"
            >
              {{ editing ? '수정' : '추가' }}
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
    </div>
  </div>
</template>
