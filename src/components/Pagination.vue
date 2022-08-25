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

const active = 'text-white bg-green-500/80 border-green-500'

const numberOfpages = computed(() => {
  // numberOfItems가 변경이 있을 경우에만 다시 계산하는 로직
  return Math.ceil(+props.numberOfItems / props.limit)
})
</script>

<template>
  <div v-if="numberOfItems !== 0" class="flex space-x-1">
    <div
      v-if="currentPage !== 1"
      class="px-3 py-1 rounded text-white cursor-pointer bg-green-500/80"
    >
      <a @click="emit('change-page', currentPage - 1)"> Prev </a>
    </div>
    <ul class="flex space-x-1 p-1">
      <li
        v-for="page in numberOfpages"
        :key="page"
        class="px-2 border rounded cursor-pointer"
        :class="
          currentPage === page ? active : 'text-green-500 border-green-500'
        "
      >
        <a @click="emit('change-page', page)">
          {{ page }}
        </a>
      </li>
    </ul>
    <div
      v-if="currentPage !== numberOfpages"
      class="px-3 py-1 rounded text-white cursor-pointer bg-green-500/80"
    >
      <a @click="emit('change-page', currentPage + 1)"> Next </a>
    </div>
  </div>
</template>
