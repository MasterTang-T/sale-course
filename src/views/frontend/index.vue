<template>
	<div class="container mx-auto px-6 py-12">
		<div class="flex justify-end items-center mb-12">
			<router-link to="/cart"
				class="flex items-center bg-white border border-gray-200 px-5 py-2.5 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm group relative">
				<i
					class="fas fa-shopping-cart text-gray-600 group-hover:text-primary transition-colors duration-300"></i>
				<span
					class="ml-2 text-gray-600 group-hover:text-primary text-sm font-medium transition-colors duration-300">购物车</span>
				<div v-if="cartItemCount > 0"
					class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
					{{ cartItemCount }}
				</div>
			</router-link>
		</div>

		<div v-if="!selectedCategory" class="space-y-12">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<category-card v-for="category in categories" :key="category.id" :category="category"
					@click="selectCategory(category)" />
			</div>
		</div>

		<div v-else class="space-y-8">
			<div class="flex items-center">
				<button @click="selectedCategory = null"
					class="flex items-center text-gray-500 hover:text-primary transition-colors duration-300">
					<i class="fas fa-arrow-left text-sm"></i>
					<span class="ml-2 text-sm font-medium">返回</span>
				</button>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<course-card v-for="course in filteredCourses" :key="course.id" :course="course"
					@add-to-cart="addToCart(course)" @show-contact="openContactModal" />
			</div>
		</div>
	</div>

	<GlobalContactButton />
	<ContactModal v-model="showContactModal" />
</template>

<script>
import CategoryCard from '@/components/CategoryCard.vue'
import CourseCard from '@/components/CourseCard.vue'
import GlobalContactButton from '@/components/GlobalContactButton.vue'
import ContactModal from '@/components/ContactModal.vue'
import categoryJson from '@/assets/categoryJson'
import goodsJson from '@/assets/goodsJson'
import { ElMessage } from 'element-plus'

export default {
	name: 'Frontend',
	components: {
		CategoryCard,
		CourseCard,
		GlobalContactButton,
		ContactModal
	},
	data() {
		return {
			categories: categoryJson.filter(category => category.type === 'frontend'),
			courses: goodsJson,
			selectedCategory: null,
			showContactModal: false
		}
	},
	computed: {
		filteredCourses() {
			if (!this.selectedCategory) return []
			return this.courses.filter(course => course.categoryId === this.selectedCategory.id)
		},
		cartItemCount() {
			return this.$store.getters['goods/getCartItems'].length
		}
	},
	methods: {
		selectCategory(category) {
			this.selectedCategory = category
		},
		addToCart(course) {
			this.$store.dispatch('goods/addToCart', course)
			ElMessage({
				message: '已添加到购物车',
				type: 'success',
				duration: 2000
			})
		},
		openContactModal() {
			this.showContactModal = true
		}
	}
}
</script>