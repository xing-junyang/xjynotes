// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import myLock from './components/myLock.vue';
import "vitepress-markdown-timeline/dist/theme/index.css";
import "./style/index.css"

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import googleAnalytics from 'vitepress-plugin-google-analytics'

const MyComponent = {
  setup() {
    return () => h('div',{class:'footer', style: "margin-bottom: 10px"}, [h('p',{style:""},[h('a',      {href:'https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1', target:"_blank", rel:"license noopener noreferrer", style:"text-decoration: underline; color:#3b3b85; font-size: 14px; padding-right: 10px;display: flex; flex-direction: row"}, ['This work is licensed under CC BY-SA 4.0 ', h('img',{style:"height:22px!important;margin-left:3px;vertical-align:text-bottom;padding-left:10px",src:"/image/copyright/cc.svg" ,alt:""}),h('img',{style:"height:22px!important;margin-left:3px;vertical-align:text-bottom;", src:"/image/copyright/by.svg",alt:""}),h('img',{style: "height:22px!important;margin-left:3px;vertical-align:text-bottom;", src: "/image/copyright/sa.svg", alt:""})])]),h('p',{style:"font-size: 14px"},'XJYNOTES © 2024 --- Made with ❤️ by XJY')])
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
    googleAnalytics({
      id: 'G-5JWWS99K54', //跟踪ID，在analytics.google.com注册即可
    });
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
        () => route.path,
        () => nextTick(() => initZoom())
    );
  }
}satisfies Theme
