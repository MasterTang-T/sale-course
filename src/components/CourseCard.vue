<template>
  <div class="transform hover:scale-105 transition-transform duration-300 scale-100">
    <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
      <div class="space-y-4">
        <!-- 课程标题 -->
        <h3 class="text-xl font-bold text-gray-800 line-clamp-1 pr-6">{{ course.goodsName }}</h3>

        <!-- 分类标签 -->
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ course.categoryName }}
        </div>

        <!-- 价格区域 -->
        <div class="flex items-center justify-between">
          <div class="flex items-baseline">
            <span class="text-2xl font-bold text-primary">¥{{ course.price }}</span>
            <span class="ml-2 text-sm text-gray-400 line-through" v-if="course.marketPrice">
              ¥{{ course.marketPrice }}
            </span>
          </div>

          <!-- 加入购物车按钮 -->
          <button
            @click="$emit('add-to-cart')"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 装饰性元素 -->
      <div class="absolute top-0 right-0 -mt-3 -mr-3 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-lg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
      validator: function(obj) {
        return obj.goodsName && obj.price && obj.categoryName !== undefined
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>