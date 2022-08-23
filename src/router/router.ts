import { createWebHistory, createRouter } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

console.log(routes)

export default router
