<template>
	<ClientOnly>
		<div class="online-compiler">
			<!-- 工具栏 -->
			<div class="toolbar">
				<div class="left-group">
					<button
						@click="toggleEdit"
						:class="{ active: editable }"
						class="icon-button"
						title="Toggle edit mode"
						:disabled="isRunning"
					>
						<span v-if="!editable">Edit</span>
						<span v-else>Save</span>
					</button>
					<button
						@click="showInputDialog = true"
						class="icon-button"
						title="Set input"
						:disabled="isRunning"
					>
						<span>Input</span>
					</button>
					<button
						@click="runCode"
						:disabled="isRunning"
						class="icon-button run-button"
					>
						<span>▶ Run</span>
					</button>
				</div>

				<div class="right-group">
					<select v-model="language" class="language-select">
						<option value="cpp">C++</option>
						<option value="c">C</option>
					</select>
				</div>
			</div>

			<div v-if="showInputDialog" class="input-container">
				<span class="input-title">Program Input</span>
				<textarea v-model="userInput" rows="5"></textarea>
				<div class="dialog-buttons">
					<button @click="showInputDialog = false" class="icon-button">
						<span>Cancel</span>
					</button>
					<button @click="saveInput" class="icon-button">
						<span>Save</span>
					</button>
				</div>
			</div>

			<!-- 代码编辑器 -->
			<div class="editor-container">
			<textarea
				ref="editor"
				v-model="code"
				:readonly="!editable"
				@keydown.tab="handleTab"
			></textarea>
			</div>

			<!-- 输出结果 -->
			<div class="output-container" v-if="output">
				<pre>{{ output }}</pre>
			</div>
		</div>

		<!-- 版权信息 -->
		<div class="compiler-copyright">
			Online compiling service provided by <a href="https://coliru.stacked-crooked.com/"
			                                        target="_blank">Coliru</a>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'

// 状态管理
const editable = ref(false)
const isRunning = ref(false)
const code = ref(defaultCode)
const output = ref('')
const language = ref<'cpp' | 'c'>('cpp')
const showInputDialog = ref(false)
const userInput = ref('')
const editor = ref<HTMLTextAreaElement | null>(null)

// 默认代码
const defaultCode = `#include <iostream>

int main() {
    std::cout << "Hello World!\\n";
    return 0;
}`

// 运行代码
const runCode = async () => {
	isRunning.value = true
	try {
		const input = userInput.value

		// add input to the command
		const cmd = language.value === 'cpp'
			? `g++ -std=c++17 main.cpp && echo "${input}" | ./a.out`
			: `gcc main.cpp && echo "${input}" | ./a.out`

		const response = await fetch('https://coliru.stacked-crooked.com/compile', {
			method: 'POST',
			body: JSON.stringify({
				cmd: cmd,
				src: code.value
			})
		})

		output.value = await response.text()
	} catch (error) {
		output.value = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
	} finally {
		isRunning.value = false
	}
}

// 切换编辑模式
const toggleEdit = () => {
	editable.value = !editable.value
	if (editable.value && editor.value) {
		editor.value.focus()
	}
}

// 处理Tab键
const handleTab = (e: KeyboardEvent) => {
	if (e.key === 'Tab' && editable.value) {
		e.preventDefault()
		const start = editor.value!.selectionStart
		const end = editor.value!.selectionEnd
		code.value = code.value.substring(0, start) + '    ' + code.value.substring(end)
		editor.value!.selectionStart = editor.value!.selectionEnd = start + 4
	}
}

// 保存输入
const saveInput = () => {
	showInputDialog.value = false
	// 这里可以添加处理用户输入的逻辑
}

onMounted(() => {
	if (editor.value) {
		editor.value.style.height = '400px'
	}
})
</script>

<style>
.online-compiler {
	max-width: 800px;
	margin: 20px auto 4px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;
	background: white;
}

.toolbar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	background: #f8f9fa;
	border-bottom: 1px solid #e9ecef;
}

.left-group, .right-group {
	display: flex;
	gap: 10px;
	align-items: center;
	width: fit-content;
}

.language-select {
	padding: 1px 10px;
	border-radius: 8px;
	border: 2px solid #ddd;
	font-size: 12px;
	font-weight: bold;

}

.language-select option {
	padding: 2px 10px;
	border-radius: 6px;
	border: 1px solid #ddd;
	text-align: center;
}

.icon-button {
	padding: 2px 13px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	background: #ebedef;
	transition: all 0.2s;
}

.icon-button:hover {
	background: #d8dce0;
}

.icon-button:disabled {
	background: #f1f3f4;
	cursor: not-allowed;
}

.icon-button:disabled span {
	color: #666;
}

.icon-button span {
	font-size: 12px;
	font-weight: bold;
}

.run-button {
	background: #4CAF50;
	color: white;
}

.run-button:hover {
	background: #45a049;
}

.run-button:disabled {
	background: #a5d6a7;
	cursor: not-allowed;
}

.editor-container {
	position: relative;
}

textarea {
	width: 100%;
	padding: 15px;
	font-family: 'Fira Code', monospace;
	font-size: 14px;
	border: none;
	resize: vertical;
	background: #ffffff;
	line-height: 1.5;
	tab-size: 4;
	border-radius: 6px;
	height: 400px;

}

textarea:focus {
	outline: none;
	background: white;
}

.output-container {
	padding: 15px;
	background: #f8f9fa;
	border-top: 1px solid #e9ecef;
}

pre {
	margin: 0;
	white-space: pre-wrap;
	word-wrap: break-word;
}

.input-container {
	padding: 15px;
	background: #f8f9fa;
	border-top: 1px solid #e9ecef;
}

.input-container textarea {
	width: 100%;
	margin: 10px 0;
	padding: 10px;
	border: 1px solid #ddd;
	height: 100px;
}

.input-title {
	font-size: 16px;
	font-weight: bold;
}

.dialog-buttons {
	display: flex;
	gap: 10px;
	justify-content: flex-end;
}

.compiler-copyright {
	padding: 0;
	text-align: right;
	font-size: 10px;
	color: #666;
}

:root.dark .online-compiler {
	background: #333;
}

:root.dark .toolbar {
	background: #444;
	border-bottom: 1px solid #555;
}

:root.dark .icon-button {
	background: #555;
}

:root.dark .icon-button:hover {
	background: #666;
}

:root.dark .run-button {
	background: #00794f;
}

:root.dark .run-button:hover {
	background: #006c47;
}

:root.dark .editor-container {
	background: #282828;
}

:root.dark textarea {
	background: #282828;
	color: #ddd;
}

:root.dark .output-container {
	background: #444;
	border-top: 1px solid #555;
}

:root.dark .input-container {
	background: #444;
	border-top: 1px solid #555;
}

:root.dark .input-container textarea {
	background: #282828;
	color: #ddd;
	border: 1px solid #555;
}

:root.dark .compiler-copyright {
	color: #999;
}

:root.dark .language-select {
	border: 2px solid #555;
}
</style>