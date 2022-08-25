import { ref, onUnmounted } from 'vue'

export const useToast = () => {
  const showToast = ref<boolean>(false)
  const toastMessage = ref<string>('')
  const toastType = ref<string>('')
  const timeout = ref<any>(null)

  onUnmounted(() => {
    clearTimeout(timeout.value)
  })

  const triggerToast = (message: string, type: string) => {
    showToast.value = true
    toastMessage.value = message
    toastType.value = type
    timeout.value = setTimeout(() => {
      showToast.value = false
      toastMessage.value = ''
      toastType.value = ''
    }, 2000)
  }

  return {
    showToast,
    toastMessage,
    toastType,
    triggerToast,
  }
}
