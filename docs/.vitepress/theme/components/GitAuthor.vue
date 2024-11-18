<template>
	<div v-if="authorInfo" class="author-info">
		<img :src="authorInfo.avatar" alt="Author Avatar" class="avatar" />
		<span class="name">{{ authorInfo.name }}</span>
	</div>
	<div v-else>
		<p>正在加载作者信息...</p>
	</div>
</template>

<script>
import axios from "axios";
import { Octokit } from "@octokit/core";

export default {
	data() {
		return {
			authorInfo: null,
		};
	},
	async mounted() {
		const octokit = new Octokit({
			auth: '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'
		})
		try {
			const repoOwner = "xing-junyang"; // 替换为你的 GitHub 用户名
			const repoName = "xjynotes"; // 替换为你的仓库名

			const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
				owner: repoOwner,
				repo: repoName,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})

			const latestCommit = response.data[0];
			const author = latestCommit.commit.author;

			this.authorInfo = {
				name: author.name,
				avatar: latestCommit.author.avatar_url,
			};
		} catch (error) {
			console.error("获取作者信息失败：", error);
		}
	},
};
</script>

<style>
.author-info {
	display: flex;
	align-items: center;
	margin: 1em 0;
}

.avatar {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 1em;
}

.name {
	font-size: 1em;
	font-weight: bold;
}
</style>
