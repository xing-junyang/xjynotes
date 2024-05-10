// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

const MyComponent = {
  setup() {
    return () => h('div',{class:'footer'}, [h('a',{href:'https://creativecommons.org/licenses/by/4.0/', style:"text-decoration: underline; color: darkblue;"}, 'This work is licensed under CC BY 4.0'),h('p','XINGJUNYANG © 2024')])
  }
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(MyComponent)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
