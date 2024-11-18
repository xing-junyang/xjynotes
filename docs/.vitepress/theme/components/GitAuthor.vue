<template>
	<div class="authors-list">
		<div v-if="authors.length > 0">
			<div v-for="author in authors" :key="author.email" class="author-info">
				<span class="author">贡献者</span>
				<img :src="author.avatar" alt="Author Avatar" class="avatar"/>
				<span class="name">{{ author.name }}</span>
<!--				<span class="count">提交次数: {{ author.count }}</span>-->
			</div>
		</div>
		<div v-else>
			<p>正在加载贡献者信息...</p>
		</div>
	</div>
</template>

<script>
import {Octokit} from "@octokit/core";
import {useRoute} from "vitepress";

export default {
	data() {
		return {
			authors: [], // 存储文件的作者信息
		};
	},
	async mounted() {
		const octokit = new Octokit({
			auth: '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'
		})
		try {
			const repoOwner = "xing-junyang"; // 替换为你的 GitHub 用户名
			const repoName = "xjynotes"; // 替换为你的仓库名
			const perPage = 100; // 每页获取的提交数
			let page = 1; // 当前页数
			let allCommits = [];

			console.log('当前路径：', this.filePath)
			const route = useRoute();
			const filePath = "/docs/"+route.path.replace(/^\//, "").replace(/\/$/, "").replace(".html","");
			console.log('计算路径', filePath);

			// 获取文件的变更记录
			const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
				owner: repoOwner,
				repo: repoName,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				},
				params: {
					path: filePath, // 指定文件路径
					per_page: perPage,
					page,
				},
			})

			const commits = response.data;
			allCommits = allCommits.concat(commits);

			// 提取唯一的作者信息
			this.authors = this.getUniqueAuthors(allCommits);
		} catch (error) {
			console.error("获取页面贡献者信息失败：", error);
		}
	},
	methods: {
		getUniqueAuthors(commits) {
			const authorsMap = new Map();
			commits.forEach((commit) => {
				const author = commit.commit.author;
				const avatar = commit.author?.avatar_url || null;

				if (!authorsMap.has(author.email)) {
					authorsMap.set(author.email, {
						name: author.name,
						email: author.email,
						avatar: avatar || `https://via.placeholder.com/40`, // 默认头像
						count: 0, // 初始化提交次数
					});
				}
				authorsMap.get(author.email).count++;
			});
			return Array.from(authorsMap.values());
		},
	},
};
</script>

<style>
.authors-list {
	margin: 1em 0;
}

.author-info {
	display: flex;
	align-items: center;
	margin-bottom: 1em;
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

.author{
	font-size: 1em;
	font-weight: bold;
	margin-right: 1em;
}

.count {
	margin-left: 1em;
	color: #555;
	font-size: 0.8em;
}
</style>
