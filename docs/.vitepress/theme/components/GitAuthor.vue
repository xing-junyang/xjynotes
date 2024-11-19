<template>
	<div class="authors-list">
		<div style="display: flex; flex-direction: row;" v-if="authors.length > 0 && (!isLoading)">
			<span class="author-info author">贡献者</span>
			<span v-for="author in authors" :key="author.email" class="author-info author">
				<a :href="author.url"><img :src="author.avatar" alt="Author Avatar" class="avatar"/></a>
				<a class="name" :href="author.url">{{ author.name }}</a>
				<span class="count">提交次数: {{ author.count }}</span>
			</span>
		</div>
		<div v-else-if="isLoading">
			<p class="loading">正在加载贡献者信息...</p>
		</div>
		<div v-else>
			<p class="loading">暂无贡献者信息</p>
		</div>
	</div>
</template>

<script setup>
import {Octokit} from "@octokit/core";
import {useRoute, } from "vitepress";
import {ref, onMounted, watchEffect} from "vue";

const authors = ref([]) // 存储文件的作者信息
const route = useRoute();
const isLoading = ref(false);

async function getAuthorsFromGithub() {
	isLoading.value = true
	const octokit = new Octokit({
		auth: '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'
	})
	try {
		const repoOwner = "xing-junyang"; // 替换为你的 GitHub 用户名
		const repoName = "xjynotes"; // 替换为你的仓库名
		const perPage = 99; // 每页获取的提交数
		let page = 1; // 当前页数
		let allCommits = [];

		const filePath = decodeURIComponent("/docs/" + route.path.replace(/^\//, "").replace(/\/$/, "").replace(".html", ""))+ '.md';
		console.log('计算路径', filePath);

		// 获取文件的变更记录
		const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
			owner: repoOwner,
			repo: repoName,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			},
			path: filePath, // 指定文件路径
			per_page: perPage,
			page,
		})

		const commits = response.data;
		allCommits = allCommits.concat(commits);
		console.log('commits', commits)

		// 提取唯一的作者信息
		authors.value = getUniqueAuthors(allCommits);

		console.log('authors', authors)
	} catch (error) {
		console.error("获取页面贡献者信息失败：", error);
	}
	isLoading.value = false
}

function getUniqueAuthors(commits) {
	const authorsMap = new Map();
	commits.forEach((commit) => {
		const author = commit.commit.author;
		const avatar = commit.author?.avatar_url || null;
		const url = commit.author?.html_url || null;

		if (!authorsMap.has(author.name)) {
			authorsMap.set(author.name, {
				name: author.name,
				email: author.email,
				avatar: avatar || `https://via.placeholder.com/40`, // 默认头像
				url: url || `https://github.com`, // 默认 GitHub 首页
				count: 0, // 初始化提交次数
			});
		}
		authorsMap.get(author.name).count++;
	});

	return Array.from(authorsMap.values()).sort((a, b) => b.count - a.count);
}

onMounted(() => {
	getAuthorsFromGithub();
});

watchEffect(() => {
	getAuthorsFromGithub();
});
</script>

<style>
.authors-list {
	margin-top: 1em;
	margin-bottom: 2em;
}

.author-info {
	display: flex;
	align-items: center;
}

.avatar {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 0.6em;
}

.name {
	font-size: 1em;
	font-weight: bold;
}

.author {
	font-size: 1em;
	font-weight: bold;
	margin-right: 1em;
}

.count {
	margin-left: 0.5em;
	color: gray;
	font-size: 0.8em;
	font-weight: lighter;
}

.loading {
	color: gray;
	font-size: 0.95em;
	font-style: italic;
}
</style>
