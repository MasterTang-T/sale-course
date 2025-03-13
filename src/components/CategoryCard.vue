<template>
  <div
    @click="$emit('click')"
    class="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-lg w-full"
  >
    <!-- 左侧彩色条 -->
    <div class="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-500 to-purple-600"></div>

    <div class="pl-8 pr-14 py-6">
      <h3 class="text-2xl font-bold text-gray-800">{{ category.name }}</h3>

      <!-- 右箭头指示符 -->
      <div class="absolute right-6 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* 确保卡片在父容器中充分展开 */
</style>