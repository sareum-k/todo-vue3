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
  <div class="w-full">
    <div
      class="flex"
      style="
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #cdf0ea;
      "
    >
      <div class="font-bold" style="font-size: 22px">Sareum's Todo</div>
      <ul class="flex">
        <li v-for="item in navItems" style="padding-right: 20px">
          <RouterLink :to="`${item.link}`">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </div>
    <div class="" style="padding: 1.5rem 10rem">
      <RouterView />
    </div>
  </div>
</template>
