<script setup>

</script>

<template>
	<div class="banner">
		<div class="banner-content">
			<span class="banner-title">期末周顺利🙏</span>
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

@media (min-width: 768px) {
	.banner-title {
		font-size: 20px;
	}
}
</style>