// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import {useData} from 'vitepress'
import {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import myLock from './components/myLock.vue';
import "vitepress-markdown-timeline/dist/theme/index.css";
import "./style/index.css"
// @ts-ignore
import MNavLinks from "./components/MNavLinks.vue";

import mediumZoom from 'medium-zoom';
import {onMounted, watch, nextTick} from 'vue';
import {useRoute} from 'vitepress';

import googleAnalytics from 'vitepress-plugin-google-analytics'
import giscusTalk from "vitepress-plugin-comment-with-giscus/lib/giscus";

import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'

const MyComponent = {
    setup() {
        return () => h('div', {
            class: 'footer',
            style: "margin-bottom: 10px"
        }, [h('p', {style: ""}, [h('a', {
            href: 'https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1',
            target: "_blank",
            rel: "license noopener noreferrer",
            style: "text-decoration: underline; color:#3b3b85; font-size: 14px; padding-right: 10px;display: flex; flex-direction: row"
        }, ['This work is licensed under CC BY-SA 4.0 ', h('img', {
            style: "height:22px!important;margin-left:3px;vertical-align:text-bottom;padding-left:10px",
            src: "/image/copyright/cc.svg",
            alt: ""
        }), h('img', {
            style: "height:22px!important;margin-left:3px;vertical-align:text-bottom;",
            src: "/image/copyright/by.svg",
            alt: ""
        }), h('img', {
            style: "height:22px!important;margin-left:3px;vertical-align:text-bottom;",
            src: "/image/copyright/sa.svg",
            alt: ""
        })])]), h('p', {style: "font-size: 14px"}, 'XJYNOTES © 2024 --- Made with ❤️ by XJY')])
    }
}

export default {
    extends: DefaultTheme,
    Layout() {
        const props: Record<string, any> = {}
        const {frontmatter} = useData()
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass //导航组件使用
        }
        return h(DefaultTheme.Layout, props, {
            'doc-footer-before': () => h(MyComponent),
            'aside-outline-before': () => h(myLock), // 注册全局锁
        })
    },
    enhanceApp({app, router}) {
        app.component('myLock', myLock); // 注册全局锁
        googleAnalytics({
            id: 'G-5JWWS99K54', //跟踪ID，在analytics.google.com注册即可
        });
        app.component('MNavLinks' , MNavLinks); //注册导航组件

        // 浏览量统计
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
    },
    setup() {
        //添加图像缩放
        const route = useRoute();
        const initZoom = () => {
            mediumZoom('.main img', {background: 'var(--vp-c-bg)'});
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );

        //添加评论功能
        const { frontmatter } = useData();

        // giscus配置
        giscusTalk({
                repo: 'xing-junyang/xjynotes-comment', //仓库
                repoId: 'R_kgDONQq-gw', //仓库ID
                category: 'Announcements', // 讨论分类
                categoryId: 'DIC_kwDONQq-g84CkWNS', //讨论分类ID
                mapping: 'pathname',
                inputPosition: 'bottom',
                lang: 'zh-CN',
                loading: "lazy",
            },
            {
                frontmatter, route
            },
            true
        );
    }
}satisfies Theme
