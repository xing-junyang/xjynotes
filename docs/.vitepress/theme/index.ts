// https://vitepress.dev/guide/custom-theme
import {h, onBeforeMount} from 'vue'
import {Theme, useRouter} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
// @ts-ignore
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
      'aside-outline-before': () => h(myLock),
    })
  },
  enhanceApp({app, router}) {
    // ...
    app.component('myLock', myLock);
  },
} satisfies Theme
