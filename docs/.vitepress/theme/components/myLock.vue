<template>
	<ClientOnly>
		<div class="home">
			<div class="container">
				<p class="passwd-title">防 yzw 装置 😋</p>
				<div class="passwd-div">
					<input v-show="isLocked" class="passwd-input" placeholder="输入这次的密码" v-model="rawPasswd" :onchange="computeHash" type="password">
					<button v-show="isLocked" @click="goToMainPage">访问</button>
					<button v-show="!isLocked" @click="exit" class="exit-button">退出</button>
				</div>
				<div class="info" v-show="isLocked">*必须输入给定的密码才可以访问本网站上的内容</div>
				<div class="info" v-show="!isLocked">*空闲时请及时退出</div>
			</div>
		</div>
	</ClientOnly>
</template>

<script setup>
import { useRouter } from 'vitepress'
import CryptoJS from 'crypto-js';
import {ref} from "vue";

const router = useRouter()

const helloString = '您可以继续访问该网站了。\n"希望没有给你带去不适。如果给你造成了影响，那么或许我永远都要欠你一个道歉了。"'
const wrongPasswdString = '密码错误！\n游智伟别看了，没有权限🤗🤗'
const exitString = '您已退出，感谢你为了安全做出的贡献'
const warnString = '游智伟洗洗睡了吧，别学了'
const rawPasswd = ref();
const publicKey = '10b086531482541496ab0d077d86e528dd479fe9e379f40b66c91e07fc463be3'
const isLocked = ref(sessionStorage.getItem('accessToken') !== 'valid');

const computeHash = () => {
	const encryptedPasswd = CryptoJS.SHA256(rawPasswd.value).toString(CryptoJS.enc.Hex);
	return encryptedPasswd
}

const goToMainPage = () => {
	if(computeHash() === publicKey) {
		sessionStorage.setItem('accessToken', 'valid') // 设置令牌
		router.go('/')
		// ElNotification({
		// 	title: '欢迎访问～',
		// 	message: helloString,
		// 	type: 'success',
		// })
		alert(helloString)
	}else{
		// ElNotification({
		// 	title: '密码错误',
		// 	message: wrongPasswdString,
		// 	type: 'error',
		// })
		alert(wrongPasswdString)
	}
}

const keydown = (e) => {
	console.log(e.key)
	if (e.key === 'Enter') {
		goToMainPage()
	}
}
window.addEventListener('keydown', keydown)

const exit = () => {
	sessionStorage.setItem('accessToken', 'invalid') // 设置令牌
	router.go('/')
	// ElNotification({
	// 	title: '已退出',
	// 	message: exitString,
	// 	type: 'success',
	// })
	alert(exitString)
}

function avoidAccess() {
	const accessToken = sessionStorage.getItem('accessToken')
	if (accessToken !== 'valid') {
		console.log(warnString)
		router.go('/')
	}
}

console.log(window.location.pathname)
const observer = new MutationObserver((mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList' && !(window.location.pathname==='/')) {
			avoidAccess();
		}
	}
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', checkLocked)
checkLocked()
function checkLocked() {
	isLocked.value = sessionStorage.getItem('accessToken') !== 'valid'
	console.log(isLocked.value)
}
</script>

<style scoped>
.home {
	height: 100%;
	width: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	display: flex;
}

button {
	margin: 5px;
	padding: 10px 20px;
	background-color: #42b983;
	color: white;
	border: none;
	cursor: pointer;
	font-size: 16px;
	border-radius: 20px;
	transition: all 0.3s ease;
	font-weight: bold;
}

.exit-button {
	background-color: darkred;
}

.exit-button:hover {
	background-color: #ff4d4d;
}

button:hover {
	background-color: #2dff9b;
	transform: scale(1.25);
	margin: 10px;
	font-weight: 800;
	font-size: 18px;
}

.container{
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	display: flex;
	margin: 20px;
	padding: 10px;
	border-radius: 12px;
	background-color: rgb(246,246,246);
	width: fit-content;
}

:root.dark .container{
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	display: flex;
	margin: 20px;
	padding: 10px;
	border-radius: 12px;
	background-color: rgb(32, 33, 38);
	width: fit-content;
}

.passwd-div{
	display: flex;
	flex-direction: row;
}

.passwd-input{
	padding: 10px;
	margin-right: 10px;
	border-radius: 12px;
	border: solid 2px rgba(183, 183, 183, 0.48);
	font-size: 16px;
	line-height: 20px;
	font-weight: bold;
}

.passwd-title{
	font-size: 20px;
	line-height: 24px;
	font-weight: bold;
	padding-left: 20px;
	padding-right: 20px;
}

.info{
	font-size: 12px;
	line-height: 16px;
	color: grey;
	padding-top: 10px;
	font-weight: bolder;
}
</style>
