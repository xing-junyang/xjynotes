<template>
	<ClientOnly>
		<div class="online-compiler">
			<!-- 工具栏 -->
			<div class="toolbar">
				<div class="left-group">
					<button
						@click="showInputDialog = true; showConfigDialog = false"
						class="icon-button"
						title="Set input"
						:disabled="isRunning"
					>
						<span>Input</span>
					</button>
					<button
						@click="showConfigDialog = true; showInputDialog = false"
						class="icon-button"
						title="Set compiler options"
						:disabled="isRunning"
					>
						<span>Config</span>
					</button>
					<button
						@click="runCode"
						:disabled="isRunning"
						class="icon-button run-button"
					>
						<span>▶ Run</span>
					</button>
					<button
						@click="code = defaultCode"
						:disabled="isRunning"
						class="reset"
					>
						<img src="/icon/redo.svg" alt="Reset">
						<span>Reset</span>
					</button>
				</div>

				<div class="right-group">
					<div class="relative">
						<button
							class="select-btn"
							@click="isOpen = !isOpen"
						>
							<img
								:src="selectedLanguage.icon"
								:alt="selectedLanguage.label"
								class="w-5 h-5"
							>
							<span class="lang">{{ selectedLanguage.label }}</span>
							<span class="arrow" :class="{ 'arrow-up': isOpen }">▼</span>
						</button>

						<transition name="fade">
							<div
								v-if="isOpen"
								class="dropdown-menu"
							>
								<div
									v-for="lang in languages"
									:key="lang.value"
									class="dropdown-item"
									@click="selectLanguage(lang)"
								>
									<img
										:src="lang.icon"
										:alt="lang.label"
										class="w-5 h-5"
									>
									<span class="lang">{{ lang.label }}</span>
								</div>
							</div>
						</transition>
					</div>
				</div>
			</div>

			<div v-if="showInputDialog" class="input-container">
				<span class="input-title">Program Input</span>
				<textarea v-model="userInput" rows="5" class="code-textarea"></textarea>
				<div class="dialog-buttons">
					<button @click="showInputDialog = false" class="icon-button">
						<span>Cancel</span>
					</button>
					<button @click="saveInput" class="icon-button">
						<span>Save</span>
					</button>
				</div>
			</div>

			<div v-if="showConfigDialog" class="input-container">
				<span class="input-title">Compiler Options</span>
				<input v-model="config" class="code-text" placeholder="Enter your compile option here.">
				<div class="dialog-buttons">
					<button @click="showConfigDialog = false" class="icon-button">
						<span>Cancel</span>
					</button>
					<button @click="showConfigDialog = false" class="icon-button">
						<span>Save</span>
					</button>
				</div>
			</div>

			<!-- 代码编辑器 -->
			<div class="editor-container">
			<textarea
				ref="editor"
				v-model="code"
				@keydown.tab="handleTab"
				class="code-textarea"
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
import {ref, onMounted, computed} from 'vue'

// 状态管理
const editable = ref(true)
const isRunning = ref(false)
const code = ref('')
const output = ref('')
const selected = ref<'cpp' | 'c'>('cpp')
const showInputDialog = ref(false)
const userInput = ref('')
const editor = ref<HTMLTextAreaElement | null>(null)
const showConfigDialog = ref(false)
const config = ref('-std=c++17')

const isOpen = ref(false)
const languages = [
	{
		value: 'cpp',
		label: 'C++',
		icon: '/icon/cpp.png'
	},
	{
		value: 'c',
		label: 'C',
		icon: '/icon/c.png'
	}
]
const selectedLanguage = computed(() =>
	languages.find(lang => lang.value === selected.value)
)
const selectLanguage = (lang) => {
	selected.value = lang.value
	isOpen.value = false
	config.value = lang.value === 'cpp' ? '-std=c++17' : ''
}

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
		const cmd = selectedLanguage.value.value === 'cpp'
			? `g++ ${config.value} main.cpp && echo "${input}" | ./a.out`
			: `gcc ${config.value} main.cpp && echo "${input}" | ./a.out`

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
	code.value = defaultCode

	if (editor.value) {
		editor.value.style.height = '400px'
	}

	document.addEventListener('click', (e) => {
		const el = document.querySelector('.relative')
		if (el && !el.contains(e.target)) {
			isOpen.value = false
		}
	})
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

@media screen and (max-width: 600px) {
	.toolbar {
		flex-direction: column;
		align-items: start;
		gap: 10px;
	}

	.reset span{
		display: none;
	}

	.reset img {
		padding-right: 0 !important;
	}
}

.left-group, .right-group {
	display: flex;
	gap: 10px;
	align-items: center;
	width: fit-content;
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

.reset{
	padding: 2px 13px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	background: #ebedef;
	transition: all 0.2s;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 29px;
}

.reset:hover {
	background: #d8dce0;
}

.reset:disabled {
	background: #f1f3f4;
	cursor: not-allowed;
}

.reset span {
	font-size: 12px;
	font-weight: bold;
}

.reset img {
	object-fit: contain;
	height: 10px;
	padding-right: 4px;
	fill: rgb(60, 60, 67);
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

.code-text{
	width: 100%;
	padding: 10px;
	font-family: 'Fira Code', monospace;
	font-size: 14px;
	resize: vertical;
	background: #ffffff;
	border-radius: 6px;
	border: 1px solid #ddd;
	margin: 10px 0;
}

.code-textarea {
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
	max-height: 500px;
}

.code-textarea:focus {
	outline: none;
	background: white;
}

.output-container {
	padding: 15px;
	background: #f8f9fa;
	border-top: 1px solid #e9ecef;
	max-height: 300px;
	overflow: auto;
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

.relative {
	position: relative;
}

.select-btn {
	display: flex;
	align-items: center;
	width: 80px;
	padding: 1px 8px;
	background: white;
	border: 2px solid #ddd;
	border-radius: 8px;
	cursor: pointer;
}

.arrow {
	margin-left: auto;
	font-size: 12px;
	transition: transform 0.2s;
}

.arrow-up {
	transform: rotate(180deg);
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	width: 80px;
	margin-top: 4px;
	background: white;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 100;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

.dropdown-item {
	display: flex;
	align-items: center;
	padding: 4px 10px;
	margin: 2px;
	cursor: pointer;
	border-radius: 6px;
	transition: background-color 0.2s;
}

.dropdown-item:hover {
	background-color: #f5f5f5;
}

.lang {
	margin-left: 4px;
	font-size: 12px;
	font-weight: bold;
}

img {
	object-fit: contain;
	height: 16px;
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

:root.dark .select-btn {
	background: #282828;
	border: 2px solid #555;
}

:root.dark .dropdown-menu {
	background: #282828;
	border: 1px solid #555;
}

:root.dark .reset img {
	filter: invert(1);
}

:root.dark .reset span {
	color: #ddd;
}

:root.dark .reset{
	background: #555;
}

:root.dark .reset:hover {
	background: #666;
}

:root.dark .code-text{
	background: #282828;
	border: 1px solid #555;
}
</style>