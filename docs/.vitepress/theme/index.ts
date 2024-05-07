// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './components/MyComponent.vue'

export default {
  extends: DefaultTheme,
  // Layout: () => h('div', 'Hello, VitePress!'),
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
