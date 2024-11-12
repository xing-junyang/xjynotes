<template>
	<ClientOnly>
		<div class="home">
			<div class="container">
				<p class="passwd-title">内容保护装置🔒</p>
				<div class="passwd-div">
					<input v-show="isLocked" class="passwd-input" placeholder="输入本次口令" v-model="rawPasswd"
					       :onchange="computeHash" type="password">
					<button v-show="isLocked" @click="goToMainPage">访问</button>
					<button v-show="!isLocked" @click="exit" class="exit-button">退出</button>
					<button v-show="isLocked" @click="showQrcode" class="show-qrcode"><img src="/icon/qrcode.svg"></button>

				</div>
				<div class="info" v-show="isLocked">*必须输入口令才可以访问本网站上的内容</div>
				<div class="info" v-show="!isLocked">*空闲时请及时退出</div>
			</div>
			<transition name="modal-fade">
				<div v-if="isQrcodePopup" class="modal-overlay" @click="isQrcodePopup = false">
					<div class="modal-content" @click.stop>
						<p class="passwd-title">关于获取口令</p>
						<p>您可以关注下方的公众号</p>
						<img src="/icon/mp_qrcode.png" alt="公众号二维码" style="width: 405px; height: 150px;">
						<p>在后台回复“口令”来获取口令</p>
						<button @click="isQrcodePopup = false">已知晓</button>
					</div>
				</div>
			</transition>
		</div>
	</ClientOnly>
</template>

<script setup>
import {useRouter} from 'vitepress'
import CryptoJS from 'crypto-js';
import {ref} from "vue";

const router = useRouter()

const helloString = '您已获取本网站的访问权限，欢迎！'
const wrongPasswdString = '口令错误，您可以关注公众号获取口令'
const exitString = '您已成功退出，感谢您的使用'
const warnString = '输入正确的口令才能访问该网站'
const rawPasswd = ref();
const publicKey = '55f05f240449117394e570fe70d7333ea298027b26b90309bffec27ec6222438'
const isLocked = ref(sessionStorage.getItem('accessToken') !== 'valid');

const computeHash = () => {
	const encryptedPasswd = CryptoJS.SHA256(rawPasswd.value).toString(CryptoJS.enc.Hex);
	return encryptedPasswd
}

const goToMainPage = () => {
	if (computeHash() === publicKey) {
		sessionStorage.setItem('accessToken', 'valid') // 设置令牌
		router.go('/')
		// ElNotification({
		// 	title: '欢迎访问～',
		// 	message: helloString,
		// 	type: 'success',
		// })
		alert(helloString)
	} else {
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

const showQrcode = () => {
	isQrcodePopup.value = true
}

const isQrcodePopup = ref(false)


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
		if (mutation.type === 'childList' && !(window.location.pathname === '/')) {
			avoidAccess();
		}
	}
});

observer.observe(document.body, {childList: true, subtree: true});

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

.container {
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	display: flex;
	margin: 20px;
	padding: 10px;
	border-radius: 12px;
	background-color: rgb(246, 246, 246);
	width: fit-content;
}

:root.dark .container {
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

.passwd-div {
	display: flex;
	flex-direction: row;
}

.passwd-input {
	padding: 10px;
	margin-right: 10px;
	border-radius: 12px;
	border: solid 2px rgba(183, 183, 183, 0.48);
	font-size: 16px;
	line-height: 20px;
	font-weight: bold;
}

.passwd-title {
	font-size: 20px;
	line-height: 24px;
	font-weight: bold;
	padding-left: 20px;
	padding-right: 20px;
}

.info {
	font-size: 12px;
	line-height: 16px;
	color: grey;
	padding-top: 10px;
	font-weight: bolder;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	background-color: rgba(255, 255, 255, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

:root.dark .modal-overlay {
	background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
	z-index: 999;
	background-color: rgb(246, 246, 246);
	padding: 20px;
	border-radius: 8px;
	border: solid 2px rgba(183, 183, 183, 0.48);
	max-width: 500px;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

:root.dark .modal-content {
	background-color: rgb(32, 33, 38);
}

.modal-fade-enter-active, .modal-fade-leave-active {
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in < 2.1.8 */ {
	opacity: 0;
	transform: scale(1);
}
</style>
