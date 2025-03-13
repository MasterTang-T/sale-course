<template>
	<el-dialog
		:model-value="modelValue"
		title="联系我们"
		width="400px"
		:show-close="true"
		@close="$emit('update:modelValue', false)"
		align-center
	>
		<div class="text-center">
			<p class="text-gray-500 mb-4">扫描下方二维码添加客服微信</p>

			<!-- 二维码区域 -->
			<div class="flex flex-col items-center space-y-4">
				<div class="bg-gradient-to-r from-primary/20 to-primary/10 p-4 rounded-2xl">
					<div class="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
						<img src="@/assets/imgs/qrcode.png" alt="微信二维码" class="w-full h-full object-contain">
					</div>
				</div>
				<p class="text-primary font-medium">微信号：tht1286545749</p>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false
	}
})

defineEmits(['update:modelValue'])
</script>