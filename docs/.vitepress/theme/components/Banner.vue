<script setup>
function close() {
	document.querySelector('.banner').style.display = 'none';
}
</script>

<template>
	<div class="banner">
		<div class="banner-content">
			<span class="banner-title">期末周顺利🙏</span>
		</div>
		<div class="close" @click="close">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
		</div>
	</div>
</template>

<style scoped>
.banner {
	background-color: rgb(228, 238, 255);
	color: rgb(60, 60, 67);
	padding: 10px 0;
	text-align: center;
	position: relative;
}

:root.dark .banner {
	background-color: rgb(0, 19, 54);
	color: rgb(167, 185, 187);
}

.banner-content {
	display: inline-block;
	padding: 0 20px;
}

.banner-title {
	font-size: 16px;
	font-weight: bold;
}

.close{
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
}

.close svg {
	width: 14px;
	height: 14px;
	fill: var(--vp-c-text-1);
}

@media (min-width: 768px) {
	.banner-title {
		font-size: 20px;
	}
}
</style>