<template>
	<ClientOnly>
		<div class="home">
			<div class="container">
				<p class="passwd-title">内容保护🔒</p>
				<div class="passwd-div">
					<input ref="targetInput" id="targetInput" v-show="isLocked" class="passwd-input" placeholder="输入本次口令" v-model="rawPasswd"
					       :onchange="computeHash" type="password" :class="{ shake: isShaking, 'error-glow': isShaking}" >
					<button v-show="isLocked" @click="goToMainPage">访问</button>
					<button v-show="!isLocked" @click="exit" class="exit-button">退出</button>
					<button v-show="isLocked" @click="showQrcode" class="show-qrcode"><img src="./qrcode.svg"></button>
				</div>
				<div class="info" v-show="isLocked">*必须输入口令才可以访问本网站上的内容</div>
				<div class="info" v-show="!isLocked">*空闲时请及时退出</div>
			</div>
			<transition name="modal-fade">
				<div v-if="isQrcodePopup" class="modal-overlay" @click="isQrcodePopup = false">
					<div class="modal-content" @click.stop>
						<p class="popup-title">关于获取口令</p>
						<div class="divider"></div>
						<p>您可以<span style="font-weight: bold">关注</span>微信公众号<span style="font-weight: bold">数海札记</span></p>
						<img src="./mp_qrcode.png" alt="公众号二维码" style="width: 405px; height: 150px;">
						<p>并在后台回复“<span style="font-weight: bold">口令</span>”来获取口令</p>
						<button @click="isQrcodePopup = false">已知晓!</button>
					</div>
				</div>
			</transition>
		</div>
		<Toast ref="toastRef"/>
	</ClientOnly>
</template>

<script setup>
import {useRouter} from 'vitepress'
import CryptoJS from 'crypto-js';
import {ref, onMounted, watch, nextTick} from "vue";
import Toast from './Toast.vue';

const router = useRouter()

const helloString = '您已获取本网站的访问权限，欢迎！'
const wrongPasswdString = '口令错误，您可以关注公众号获取口令'
const exitString = '您已成功退出，感谢您的使用！'
const warnString = '输入正确的口令才能访问该网站'
const rawPasswd = ref();
const publicKey = '55f05f240449117394e570fe70d7333ea298027b26b90309bffec27ec6222438'
const isLocked = ref(sessionStorage.getItem('accessToken') !== 'valid');
const toastRef = ref(null);
const isShaking = ref(false);

const computeHash = () => {
	return CryptoJS.SHA256(rawPasswd.value).toString(CryptoJS.enc.Hex);
}

const goToMainPage = () => {
	if (computeHash() === publicKey) {
		if (toastRef.value) {
			toastRef.value.showToast(helloString, '#42b983', 'Validated');
		}
		sessionStorage.setItem('accessToken', 'valid') // 设置令牌
		setTimeout(() => {
			if (router.route.path === '/') {
				window.location.reload(); // 刷新页面
			}
		}, 3000)
	} else {
		if (toastRef.value) {
			toastRef.value.showToast(wrongPasswdString, 'darkred', 'Failed');
		}
		triggerShake();
	}
}

const keydown = (e) => {
	if (e.key === 'Enter') {
		goToMainPage()
	}
}
window.addEventListener('keydown', keydown)

const exit = () => {
	sessionStorage.setItem('accessToken', 'invalid') // 设置令牌
	if (router.route.path === '/' && toastRef.value) { // 如果不在主页，不显示退出提示
		toastRef.value.showToast(exitString, '#42b983', 'Success');
	}
	if (router.route.path === '/') {
		setTimeout(() => {
			window.location.reload(); // 刷新页面
		}, 3000)
	}else{
		router.go('/');
	}
}

const showQrcode = () => {
	isQrcodePopup.value = true
}

const isQrcodePopup = ref(false)
const targetInput = ref(null);
function avoidAccess() {
	const accessToken = sessionStorage.getItem('accessToken')
	if (accessToken !== 'valid') {
		console.log(warnString);
		router.go('/').then(()=>{
			toggleInput();
		})
	}
}

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
}

function triggerShake() {
	isShaking.value = true;
	setTimeout(() => {
		isShaking.value = false;
	}, 1500);
}

// 在页面刷新后定位到密码框
const toggleInput = async () => {
	if (isLocked.value) {
		await nextTick(); // 等待 DOM 更新
		if(document.getElementById("targetInput")){
			document.getElementById("targetInput").focus();
		}else {
		}
	}
};
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
	min-height: 44px;
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
	padding: 10px 20px;
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
	padding: 10px 20px;
	border-radius: 12px;
	background-color: rgb(32, 33, 38);
	width: fit-content;
}

.passwd-div {
	display: flex;
	flex-direction: row;
	align-items: center;

}

.passwd-input {
	padding: 10px;
	margin-right: 10px;
	border-radius: 12px;
	border: solid 2px rgba(183, 183, 183, 0.48);
	font-size: 16px;
	line-height: 20px;
	font-weight: bold;
	width: 160px;
	max-height: 60px;
	box-shadow: none;
	transition: box-shadow 1s ease, border-color 1s ease;
}

.popup-title {
	font-size: 20px;
	line-height: 24px;
	font-weight: bold;
	padding-left: 20px;
	padding-right: 20px;
	margin: 0px;
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

.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in < 2.1.8 */
{
	opacity: 0;
	transform: scale(1);
}

.divider {
	margin-top: 20px;
	margin-bottom: 5px;
	width: 100%;
	height: 1px;
	background-color: var(--vp-c-divider);
}

@keyframes shake {
	0%, 100% { transform: translateX(0); }
	10%, 30%, 50%, 70%, 90%{ transform: translateX(-10px); }
	20%, 40%, 60%, 80%{ transform: translateX(10px); }
}

.shake {
	animation: shake 0.8s ease;
}

.error-glow {
	border: 2px solid red;
	box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
	transition: box-shadow 0.5s ease, border-color 0.5s ease;
}

.show-qrcode{
	min-width: 50px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
