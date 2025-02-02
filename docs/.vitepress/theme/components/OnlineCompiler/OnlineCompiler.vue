<template>
	<ClientOnly>
		<div class="online-compiler">
			<!-- 工具栏 -->
			<div class="toolbar">
				<div class="left-group">
					<button
						@click="showInputDialog = true; showConfigDialog = false; lastUserInput = userInput;"
						class="icon-button"
						title="Set input"
						:disabled="isRunning"
					>
						<span>Input</span>
					</button>
					<button
						@click="showConfigDialog = true; showInputDialog = false; lastConfig = config;"
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
						<img class="icon-img" src="/icon/redo.svg" alt="Reset">
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
								class="icon-img"
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
										class="icon-img"
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
				<textarea v-model="userInput" rows="5" class="input-textarea" spellcheck="false" placeholder="Enter runtime input here."></textarea>
				<div class="dialog-buttons">
					<button @click="showInputDialog = false; userInput = lastUserInput" class="icon-button">
						<span>Cancel</span>
					</button>
					<button @click="showInputDialog = false;" class="icon-button">
						<span>Save</span>
					</button>
				</div>
			</div>

			<div v-if="showConfigDialog" class="input-container">
				<span class="input-title">Compiler Options</span>
				<input v-model="config" class="code-text" spellcheck="false" placeholder="Enter your compile option here.">
				<div class="dialog-buttons">
					<button @click="showConfigDialog = false; config = lastConfig" class="icon-button">
						<span>Cancel</span>
					</button>
					<button @click="showConfigDialog = false" class="icon-button">
						<span>Save</span>
					</button>
				</div>
			</div>

			<!-- 代码编辑器 -->
			<div class="editor-container">
				<!-- 真实的输入框 -->
				<textarea
					ref="editor"
					v-model="code"
					@keydown.tab.prevent="handleTab"
					@scroll="syncScroll"
					class="code-textarea"
					spellcheck="false"
				></textarea>

				<!-- 用于显示高亮的pre元素 -->
				<pre
					ref="highlight"
					class="code-highlight"
					@scroll="syncScroll"
				><code v-html="highlightedCode"></code></pre>
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
import {computed, onMounted, ref} from 'vue'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'

Prism.plugins.matchBrackets = false;

// 状态管理
const isRunning = ref(false)
const code = ref('')
const output = ref('')
const selected = ref<'cpp' | 'c'>('cpp')
const showInputDialog = ref(false)
const userInput = ref('')
const editor = ref<HTMLTextAreaElement | null>(null)
const highlight = ref(null);
const showConfigDialog = ref(false)
const config = ref('-std=c++17')

// 上次用户输入，用于撤销
const lastUserInput = ref('')
const lastConfig = ref('')

// 默认代码
let defaultCode = `#include <iostream>

int main() {
    std::cout << "Hello World!\\n";
    return 0;
}`

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
	defaultCode = lang.value === 'cpp' ? `#include <iostream>

int main() {
	std::cout << "Hello World!\\n";
	return 0;
}` : `#include <stdio.h>

int main() {
	printf("Hello World!\\n");
	return 0;
}`
	code.value = defaultCode
}

const highlightedCode = computed(() => {
	// 对特殊字符进行转义
	const escapedCode = code.value

	// 显示行号

	// 使用Prism进行高亮
	return Prism.highlight(
		escapedCode,
		Prism.languages.cpp,
		'cpp'
	);
});

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
const handleTab = (e) => {
	const textarea = e.target;
	const start = textarea.selectionStart;
	const end = textarea.selectionEnd;
	console.log(start, end)

	const isMultiLine = textarea.value.substring(start, end).includes('\n');

	if(isMultiLine){
		const selectedText = textarea.value.substring(start, end);
		const lines = selectedText.split('\n');

		const newLines = lines.map((line) => {
			if (line.startsWith('\t')) {
				return line.substring(1); // 删除一个制表符
			} else if (line.startsWith(' ')) {
				return line.replace(/^ {1,4}/, ''); // 删除最多 4 个空格
			}
			return line;
		});
		const newText = newLines.join('\n');

		code.value = code.value.substring(0, start) + newText + code.value.substring(end);
		textarea.value = code.value;
		textarea.focus();
		textarea.selectionStart = start;
		textarea.selectionEnd = start + newText.length;
	}

	if(e.shiftKey){
		const beforeCursor = textarea.value.substring(0, start);
		const lines = beforeCursor.split('\n');
		const currentLine = lines[lines.length - 1];
		const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;

		// 如果当前行以制表符或空格开头，则删除一个缩进
		// 获取当前行的空格数
		const spaces = currentLine.match(/^(    )+/);
		const spaceCount = spaces ? spaces[0].length: 0;
		if (spaceCount > 0) {
			const newSpaceCount = Math.max(spaceCount - 4, 0);
			console.log('newSpaceCount', newSpaceCount)
			console.log('currentLineStart', currentLineStart)
			code.value = code.value.substring(0, currentLineStart + newSpaceCount) + code.value.substring(currentLineStart + spaceCount);
			textarea.value = code.value;
			textarea.focus();
			// 将光标移动到插入位置之前
			textarea.selectionStart = textarea.selectionEnd = currentLineStart + newSpaceCount;
		}
	}else{
		// 插入空格作为缩进
		code.value = code.value.substring(0, start) + '    ' + code.value.substring(end);
		textarea.value = code.value;
		textarea.focus();
		// 将光标移动到插入位置之后
		textarea.selectionStart = textarea.selectionEnd = start + 4;
	}


	console.log(textarea.selectionStart, textarea.selectionEnd)
};

// 同步滚动
const syncScroll = (e) => {
	const target = e.target;
	const other = target === editor.value ? highlight.value : editor.value;
	other.scrollTop = target.scrollTop;
	other.scrollLeft = target.scrollLeft;
};

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

.editor-container {
	position: relative;
	height: 400px;
	max-height: 500px;
	width: 100%;
	font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.input-textarea{
	width: 100%;
	margin: 10px 0;
	padding: 10px;
	border: 1px solid #ddd;
	height: 100px;
	border-radius: 6px;
	font-family: 'Fira Code', monospace;
	font-size: 14px;
}

.code-textarea,
.code-highlight{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: 15px;
	font-family: inherit;
	font-size: 14px;
	border: none;
	resize: vertical;
	border-radius: 6px;
	line-height: 1.5;
	box-sizing: border-box;
	overflow: auto;
	white-space: pre;
	word-wrap: normal;
	tab-size: 4;

}

.code-textarea{
	color: transparent;
	background: transparent;
	caret-color: #000000; /* 光标颜色 */
	resize: none;
	z-index: 1;
}

.code-highlight{
	pointer-events: none;
	background: #ffffff; /* 深色背景 */
	z-index: 0;
}

.code-highlight code *{
	font-family: inherit;
	font-size: 14px;
	background: none !important;
}

.output-container {
	padding: 15px;
	background: #f8f9fa;
	border-top: 1px solid #e9ecef;
	max-height: 300px;
	border-radius: 0 0 6px 6px;
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

.icon-img {
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

:root.dark .dropdown-item {
	background: #282828;
}

:root.dark .dropdown-item:hover {
	background: #333;
}

:root.dark .code-textarea {
	border: none;
	caret-color: #ffffff;
}

:root.dark .code-highlight {
	background: #282828;
}
</style>