<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  numberOfItems?: string | number
  limit?: number
  currentPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  numberOfItems: 0,
  limit: 10,
  currentPage: 1,
})

const emit = defineEmits<{
  (event: 'change-page', value: number): void
}>()

const active = {
  backgroundColor: 'skyblue',
  color: 'white',
  border: '1px solid skyblue',
}

const numberOfpages = computed(() => {
  // numberOfItems가 변경이 있을 경우에만 다시 계산하는 로직
  return Math.ceil(+props.numberOfItems / props.limit)
})
</script>

<template>
  <div v-if="numberOfItems !== 0" class="flex space-x-1">
    <div
      v-if="currentPage !== 1"
      class="px-3 py-1 rounded text-white"
      style="background-color: skyblue; cursor: pointer"
    >
      <a @click="emit('change-page', currentPage - 1)"> Prev </a>
    </div>
    <ul class="flex space-x-1 p-1">
      <li
        v-for="page in numberOfpages"
        :key="page"
        class="px-2 border rounded text-blue-400"
        style="border-color: skyblue; color: gray; cursor: pointer"
        :style="currentPage === page ? active : ''"
      >
        <a @click="emit('change-page', page)">
          {{ page }}
        </a>
      </li>
    </ul>
    <div
      v-if="currentPage !== numberOfpages"
      class="px-3 py-1 rounded text-white"
      style="background-color: skyblue; cursor: pointer"
    >
      <a @click="emit('change-page', currentPage + 1)"> Next </a>
    </div>
  </div>
</template>
