<script setup>

</script>

<template>
	<div class="banner">
		<div class="banner-content">
			<span class="banner-title">辞旧迎新，年年新气象。祝大家元旦快乐🎉</span>
		</div>
	</div>
</template>

<style scoped>
.banner {
	background-color: #ff2121;
	color: #fff;
	padding: 10px 0;
	text-align: center;
	position: relative;
}

:root.dark .banner {
	background-color: #6c0000;
}

.banner-content {
	display: inline-block;
	padding: 0 20px;
}

.banner-title {
	font-size: 16px;
	font-weight: bold;
}

@media (min-width: 768px) {
	.banner-title {
		font-size: 20px;
	}
}
</style>