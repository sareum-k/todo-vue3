<script setup lang="ts">
import type { Item } from '@/views/todos/index.vue'
import { useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    itemList: Array<Item>
  }>(),
  {}
)

const router = useRouter()

const itemStyle = {
  textDecoration: 'line-through',
  color: 'gray',
}

const emit = defineEmits<{
  (event: 'delete-item', value: number): void
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
</script>

<template>
  <template
    v-if="itemList.length !== 0"
    v-for="(item, index) in itemList"
    :key="index"
  >
    <div
      class="border p-3 rounded-md text-sm flex justify-between items-center"
      style="cursor: pointer"
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
        <label :style="item.completed ? itemStyle : ''"
          >{{ item.content }}
        </label>
      </div>
      <button
        type="button"
        style="background-color: gray; color: white; border-radius: 5px"
        class="px-3"
        @click.stop="emit('delete-item', index)"
      >
        Delete
      </button>
    </div>
  </template>
  <template v-else>
    <div>To Do List가 없습니다!</div>
  </template>
</template>
