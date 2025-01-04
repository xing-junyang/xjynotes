<script setup>
import {ref} from 'vue';

const showBanner = ref(sessionStorage.getItem('close_banner') !== 'true');

function close() {
	showBanner.value = false;
	sessionStorage.setItem('close_banner', 'true');
}
</script>

<template>
	<div class="banner-container">
		<div class="banner" v-if="showBanner">
			<div class="banner-content">
				<div class="banner-content-container">
			<span class="banner-title">
				✨机器学习重点已上传✨
			</span>
					<a class="link"
					   href="https://xjynotes.top/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E5%A4%8D%E4%B9%A0%E9%87%8D%E7%82%B9.html">Check
						it out!</a>
				</div>
			</div>
			<div class="close" @click="close">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
					<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
					<path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
				</svg>
			</div>
		</div>
	</div>
</template>

<style scoped>
.banner-container {
	container-type: inline-size;
	container-name: banner;
}

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

.banner-content-container {
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: 10px;
}

.banner-title {
	font-size: 20px;
	font-weight: bold;
}

.link {
	text-decoration: none;
	border-radius: 16px;
	padding: 0px 12px;
	margin: 0 4px;
	background-color: #bbdaff;
	transition: background-color 0.3s, color 0.25s, opacity 0.25s;
	font-size: 14px;
	color: var(--vp-c-brand-1);
	font-weight: bold;
}

:root.dark .link {
	background-color: #0a2e4e;
	color: #bbdaff;
}

.close {
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

@container banner (max-width: 240px) {
	.banner{
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		border-radius: 12px;
		align-items: normal;
	}
	.banner-content {
		width: 100%;
		padding: 0 10px;
	}
	.banner-content-container {
		flex-direction: column;
	}
	.close {
		display: none;
	}
	.banner-title {
		font-size: 16px;
	}


}
</style>