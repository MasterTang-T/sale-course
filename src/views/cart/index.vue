<template>
	<div class="container mx-auto px-6 py-12">
		<!-- 页面标题 -->
		<div class="flex justify-between items-center mb-8">
			<div class="flex items-center space-x-4">
				<h1 class="text-2xl font-bold text-gray-800">购物车</h1>
				<router-link
					to="/frontend"
					class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-primary/10 hover:text-primary transition-all duration-300"
					title="返回首页"
				>
					<el-icon class="text-lg"><House /></el-icon>
				</router-link>
			</div>
			<div class="flex items-center space-x-4">
				<button
					@click="handleSelectAll"
					class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
				>
					{{ isAllSelected ? '取消全选' : '全选' }}
				</button>
				<button
					v-if="selectedItems.length > 0"
					@click="handleCopySelected"
					class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
				>
					复制选中商品名称
				</button>
				<button
					v-if="selectedItems.length > 0"
					@click="handleDeleteSelected"
					class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
				>
					删除选中
				</button>
			</div>
		</div>

		<!-- 购物车为空时的提示 -->
		<div v-if="cartItems.length === 0" class="text-center py-16">
			<div class="text-gray-400 mb-4">
				<i class="fas fa-shopping-cart text-6xl"></i>
			</div>
			<p class="text-gray-500 text-lg">购物车是空的</p>
			<router-link
				to="/frontend"
				class="inline-block mt-4 px-6 py-2 text-primary hover:text-primary/90"
			>
				去选购课程
			</router-link>
		</div>

		<!-- 购物车商品列表 -->
		<div v-else class="space-y-4">
			<div
				v-for="item in cartItems"
				:key="item.goodsId"
				class="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4 animate-fade-in"
			>
				<input
					type="checkbox"
					:checked="item.selected"
					@change="toggleSelect(item.goodsId)"
					class="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
				>
				<div class="flex-1">
					<h3 class="text-lg font-medium text-gray-900">{{ item.goodsName }}</h3>
					<div class="mt-1 flex items-center space-x-4">
						<template v-if="item.price > 0">
							<span class="text-primary font-medium">¥{{ item.price }}</span>
						</template>
						<template v-else>
							<button
								@click="showContactModal = true"
								class="flex items-center bg-white border border-gray-200 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm group"
							>
								<i class="fas fa-phone text-gray-600 group-hover:text-primary transition-colors duration-300"></i>
								<span class="ml-2 text-gray-600 group-hover:text-primary text-sm font-medium transition-colors duration-300">联系我</span>
							</button>
						</template>
						<span class="text-gray-400 line-through text-sm">¥{{ item.marketPrice }}</span>
						<span class="text-gray-500 text-sm">{{ item.categoryName }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 联系我弹窗 -->
		<ContactModal v-model="showContactModal" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { House } from '@element-plus/icons-vue'
import ContactModal from '@/components/ContactModal.vue'

const store = useStore()
const router = useRouter()

const showContactModal = ref(false)

// 获取购物车商品列表
const cartItems = computed(() => store.getters['goods/getCartItems'])

// 获取选中的商品
const selectedItems = computed(() => cartItems.value.filter(item => item.selected))

// 是否全选
const isAllSelected = computed(() => {
	return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
})

// 切换商品选中状态
const toggleSelect = (goodsId) => {
	const item = cartItems.value.find(item => item.goodsId === goodsId)
	if (item) {
		store.dispatch('goods/toggleCartItemSelect', {
			goodsId,
			selected: !item.selected
		})
	}
}

// 全选/取消全选
const handleSelectAll = () => {
	store.dispatch('goods/toggleAllCartItems', !isAllSelected.value)
}

// 复制选中商品名称
const handleCopySelected = async () => {
	const selectedNames = selectedItems.value.map(item => item.goodsName).join('\n')
	try {
		await navigator.clipboard.writeText(selectedNames)
		ElMessage.success('商品名称已复制到剪贴板！')

		ElMessageBox.confirm('是否从购物车中移除已复制的商品？', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			const selectedIds = selectedItems.value.map(item => item.goodsId)
			store.dispatch('goods/removeFromCart', selectedIds)
			ElMessage.success('已清除选中商品')
		}).catch(() => {
			ElMessage.info('已取消操作')
		})
	} catch (err) {
		ElMessage.error('复制失败，请重试')
		console.error('复制失败:', err)
	}
}

// 删除选中商品
const handleDeleteSelected = () => {
	ElMessageBox.confirm('确定要删除选中的商品吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		const selectedIds = selectedItems.value.map(item => item.goodsId)
		store.dispatch('goods/removeFromCart', selectedIds)
		ElMessage.success('删除成功')
	}).catch(() => {
		ElMessage.info('已取消删除')
	})
}
</script>

<style lang="scss" scoped>
.animate-fade-in {
	animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>