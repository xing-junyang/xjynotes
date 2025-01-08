<script setup>
import {onMounted, ref} from 'vue'

//static tips data
const tips = [
	'本站支持暗黑模式，点击右上角的按钮切换。',
	'本站支持移动端访问，可以在手机上查看。',
	'如果有好的建议或者意见，欢迎在评论区留言。',
	'本站使用 VitePress 搭建，感兴趣的话可以在共建共享栏目中学习构建。',
	'如果你喜欢本站，欢迎收藏和分享！',
	'欢迎提供你的文章，可参照共建共享栏目中的说明。',
	'记住本站的域名 www.xjynotes.top',
	'本站支持搜索功能，可以在上方搜索框中输入关键字搜索。',
	'本站利用 Github Actions 实现流水线自动化部署。',
	'页面右侧的目录栏显示了当前页面的大纲。',
	'可以在左侧的导航栏上查看本网站的所有内容。',
	'对于移动用户，导航栏位于上方横条的左侧 "頁面導航" 菜单中，目录栏位于上方横条的右侧 "本頁面" 下拉菜单中，可以点击最上方的按钮进行搜索。',
	'站点导航页收录了很多优秀学习资料！',
	'期末周顺利🙏',
	'评论时可以使用 Markdown 语法。',
	'Co-rricula is for Collaborative Curricula.',
	'本站（目前）实现了运营零成本。',
	'欢迎在站点导航页的评论区分享自己认为有用的站点！',
	'文章的贡献者是从 Git 的提交记录中自动获取的。',
	'本站使用 Cloudflare 加速访问。',
	'点击图片可以全屏观看。',
	'在移动端显示不全的公式、表格或代码块可以左右滑动查看。',
	'大二上复习资料（2023级）已经更新，感谢 2023 级全体学委的付出！',
	'如果在页面中发现错误，欢迎在评论区指出。',
	'代码块支持一键复制功能。',
	'可以在提交评论前先预览渲染效果。',
	'搜索时可以点击切换按钮查看具体内容。',
	'本站的访问量通过路由跳转统计。',
	'所有文章按照 CC BY-SA 4.0 协议发布。如有转载，请注明出处。如有侵权，请联系站长删除。',
	'Made with ❤️ by NJUSEers.',
	'数海札记是一个分享数学上的有趣问题的专栏！',
	'在数海札记板块里有一些高中数学的有趣问题，有兴趣可以尝试！',
]

//randomly select a tip
const randomTip = ref(tips[Math.floor(Math.random() * tips.length)])

//refresh tip after 10 seconds
onMounted(() => {
	setInterval(() => {
		randomTip.value = tips[Math.floor(Math.random() * tips.length)]
	}, 20000)
})
</script>

<template>
	<ClientOnly>
		<div class="tips-container">
			<div class="tip-header">
				<div class="tips-title">
					小提示
				</div>
				<div class="tips-change" @click="randomTip = tips[Math.floor(Math.random() * tips.length)]">
					<!--				icon-->
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
						<path
							d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z"/>
					</svg>
					<span>换一条</span>
				</div>
			</div>

			<div class="tips-content">
				<transition name="fade" mode="out-in">
					<span :key="randomTip">{{ randomTip }}</span>
				</transition>
			</div>
		</div>
	</ClientOnly>
</template>

<style scoped>
.tips-container {
	margin: 20px 0;
	padding: 16px;
	border-radius: 12px;
	background-color: var(--vp-carbon-ads-bg-color);
	transition: all 0.5s ease-in-out;
}

.tips-content {
	font-size: 14px;
	color: var(--vp-carbon-ads-poweredby-color);
	min-height: 20px; /* 设置一个最小高度 */
}

/* 修改渐变动画 */
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease-in-out;
	max-height: 100px;
	opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
	max-height: 0;
	opacity: 0;
	margin-top: -20px;
}

/* 其余样式保持不变 */
.tip-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.tips-title {
	font-size: 14px;
	font-weight: bold;
}

.tips-change {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 13px;
}

.tips-change svg {
	width: 13px;
	height: 13px;
	margin-right: 5px;
	fill: var(--vp-carbon-ads-poweredby-color);
}

.tips-change span {
	text-align: right;
	font-size: 13px;
	color: var(--vp-carbon-ads-poweredby-color);
	font-weight: bold;
}
</style>