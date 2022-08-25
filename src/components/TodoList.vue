<script setup lang="ts">
import { ref } from 'vue'
import type { Item } from '@/views/todos/index.vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'

withDefaults(
  defineProps<{
    itemList: Array<Item>
  }>(),
  {}
)

const router = useRouter()
const showModal = ref<boolean>(false)
const todoDeleteId = ref<number | null>(null)

const emit = defineEmits<{
  (event: 'delete-item', value: number | null): void
  (event: 'toggle-item', value: number, checked: boolean): void
}>()

function moveToDetailPage(id: number | null) {
  router.push({
    name: 'todos-:id',
    params: {
      id,
    },
  })
}

const openModal = (id: number | null) => {
  todoDeleteId.value = id
  showModal.value = true
}

const closeModal = () => {
  todoDeleteId.value = null
  showModal.value = false
}

const deleteTodo = () => {
  emit('delete-item', todoDeleteId.value)
  closeModal()
}
</script>

<template>
  <template
    v-if="itemList.length !== 0"
    v-for="(item, index) in itemList"
    :key="index"
  >
    <div
      class="border p-3 rounded-md text-sm flex justify-between items-center cursor-pointer"
      @click="moveToDetailPage(item.id)"
    >
      <div class="space-x-1 flex items-center w-full">
        <input
          type="checkbox"
          :checked="item.completed"
          @change="
            emit(
              'toggle-item',
              index,
              ($event.target as HTMLInputElement).checked
            )
          "
          @click.stop
        />
        <label
          class="cursor-pointer"
          :class="item.completed ? 'line-through text-gray-500' : ''"
          >{{ item.content }}
        </label>
      </div>
      <button
        type="button"
        class="px-4 py-1 bg-gray-500/50 rounded text-white"
        @click.stop="openModal(item.id)"
      >
        Delete
      </button>
    </div>
  </template>
  <template v-else>
    <div>To Do List가 없습니다!</div>
  </template>
  <Teleport to="#modal">
    <div>
      <Modal v-if="showModal" @on-close="closeModal" @on-delete="deleteTodo">
        <template v-slot:title>Todo 삭제</template>
        <template v-slot:content>정말 삭제하시겠습니까?</template>
      </Modal>
    </div>
  </Teleport>
</template>
