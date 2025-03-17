<template>
  <div class="fixed bottom-10 right-6 z-40">
    <button
      @click="showModal = true"
      class="group flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <span class="text-primary font-medium">联系我们</span>
      <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
    </button>

    <!-- 联系弹窗 -->
    <ContactModal v-model="showModal" />
  </div>
</template>

<script>
import ContactModal from './ContactModal.vue'

export default {
  name: 'GlobalContactButton',
  components: {
    ContactModal
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>