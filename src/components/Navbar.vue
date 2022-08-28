<script setup lang="ts">
export interface NavItem {
  name: string
  link: string
}

const navItems: NavItem[] = [
  { name: '🏠HOME', link: '/' },
  { name: '✅TODOS', link: '/todos' },
]
</script>

<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center">
    <div
      class="flex absolute top-0 w-full justify-between items-center p-5 bg-green-100"
    >
      <div class="font-bold text-xl">Sareum's Todo</div>
      <ul class="flex space-x-5">
        <li v-for="item in navItems">
          <RouterLink :to="`${item.link}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </div>
    <div class="py-5 px-20 w-full">
      <RouterView />
    </div>
  </div>
</template>
