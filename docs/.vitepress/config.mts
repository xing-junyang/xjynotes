import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小金鱼的笔记本",
  description: "这是小金鱼的软工学习笔记",
  markdown: {math: true},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/简介.md' }
    ],

    sidebar: [
      {
        items: [
          { text: '简介', link: '/简介' },
          { text: 'QEMU虚拟机',
            collapsed: true,
            items: [
              { text: 'QEMU虚拟机简介',
                link: '/qemu虚拟机/qemu简介'
              }
            ]
          },
          {
            text: '数海札记文章',
            collapsed: true,
            items: [
              {text: '积分视角下的均值不等式', link: '/数海札记/积分视角下的均值不等式'}
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xing-junyang/xing-junyang.github.io' }
    ]
  }
})

