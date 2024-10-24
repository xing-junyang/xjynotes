// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import {Theme, useRouter} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import myLock from './components/myLock.vue';

const MyComponent = {
  setup() {
    return () => h('div',{class:'footer', style: "margin-bottom: 10px"}, [h('p',{style:""},[h('a',      {href:'https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1', target:"_blank", rel:"license noopener noreferrer", style:"text-decoration: underline; color: darkblue; font-size: 14px; padding-right: 10px;display: flex; flex-direction: row"}, ['This work is licensed under CC BY-SA 4.0 ', h('img',{style:"height:22px!important;margin-left:3px;vertical-align:text-bottom;padding-left:10px",src:"/image/copyright/cc.svg" ,alt:""}),h('img',{style:"height:22px!important;margin-left:3px;vertical-align:text-bottom;", src:"/image/copyright/by.svg",alt:""}),h('img',{style: "height:22px!important;margin-left:3px;vertical-align:text-bottom;", src: "/image/copyright/sa.svg", alt:""})])]),h('p',{style:"font-size: 14px"},'XJYNOTES © 2024 --- Made with ❤️ by XJY')])
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(MyComponent),
    })
  },
  enhanceApp({app, router}) {
    // ...
    app.component('myLock', myLock);
    const warnString = '游智伟别看了，没有权限'
    const homeBlock = document.querySelector('.VPHome');
    function avoidAccess() {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken !== 'valid') {
        console.log(warnString)
        router.go('/')
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && !(window.location.pathname==='/')) {
          avoidAccess();
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
} satisfies Theme
