<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';

// 弹窗内容和控制变量
const message = ref('这是一个即时消息弹窗');
const isVisible = ref(false);
const color = ref('black');
const title = ref('提示');

// 显示消息弹窗
function showToast(newMessage: string, newColor = 'black', newTitle = '提示') {
	message.value = newMessage;
	isVisible.value = true;
	color.value = newColor;
	title.value = newTitle;

	// 两秒后开始淡出动画
	setTimeout(() => {
		isVisible.value = false;
	}, 2000);
}

defineExpose({
	showToast,
});
</script>

<template>
	<ClientOnly>
		<transition name="modal-fade">
			<div
				v-if="isVisible"
				class="toast-message"
			>
				<p class="toast-message-title" :style="{ color}">{{ title }}</p>
				<div class="divider"></div>
				<p class="toast-message-content">{{ message }}</p>
			</div>
		</transition>
	</ClientOnly>
</template>

<style scoped>
.toast-message {
	position: fixed;
	right: 20px;
	bottom: 20px;
	padding: 10px 20px;
	z-index: 999;
	background-color: rgb(246, 246, 246);
	border: solid 2px rgba(183, 183, 183, 0.48);
	border-radius: 12px;
}

:root.dark .toast-message {
	background-color: rgb(32, 33, 38);
}

.toast-message-title{
	font-size: 20px;
	line-height: 24px;
	font-weight: 1000;
}

.toast-message-content{
	color: black;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
}

.modal-fade-enter-active, .modal-fade-leave-active {
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in < 2.1.8 */ {
	opacity: 0;
	transform: scale(1);
}

.divider {
	margin-top: 20px;
	margin-bottom: 5px;
	width: 100%;
	height: 1px;
	background-color: var(--vp-c-divider);
}
</style>