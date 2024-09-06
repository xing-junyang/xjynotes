import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小金魚的筆記本",
  description: "這是小金魚的軟工學習筆記",
  markdown: {math: true, image:{lazyLoading: true}},
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主頁 🖥', link: '/' },
      { text: '筆記 📒', link: '/简介.md' },
      { text: '照片 🎞', link: '/兴趣使然的时光小记/南京/南京.md' }
    ],

    sidebar: [
      {
        items: [
          { text: '简介', link: '/简介' },
          { text: '软件工程基础',
            collapsed: true, 
            items: [
              { text: '概念基础', link: '/软件工程/软件工程基础.md' },
              { text: '需求分析', 
                collapsed: true,
                items: [
                  { text: '需求基础', link: '/软件工程/需求基础.md' },
                  { text: '需求分析方法', link: '/软件工程/需求分析方法.md' },
                  { text: '需求文档化与验证', link: '/软件工程/需求文档化与验证.md' }
                ]
              },
              { text: '体系结构',
                collapsed: true,
                items: [
                  { text: '软件设计基础', link: '/软件工程/软件设计基础.md'},
                  { text: '软件体系结构基础', link: '/软件工程/软件体系结构基础.md' },
                  { text: '软件体系结构设计与构建', link: '/软件工程/软件体系结构设计与构建.md' },
                  { text: '人机交互', link: '/软件工程/人机交互.md' }
                ]
              },
              {
                text: '详细设计',
                collapsed: true,
                items: [
                  { text: '详细设计基础', link: '/软件工程/详细设计.md' },
                  { text: '模块化与信息隐藏', link: '/软件工程/模块化与信息隐藏.md' },
                  { text: '面向对象的模块化', link: '/软件工程/面向对象的模块化.md' },
                  { text: '面向对象的信息隐藏', link: '/软件工程/面向对象的信息隐藏.md' },
                  { text: '设计模式', link: '/软件工程/设计模式.md' }
                ]
              },
              {
                text: '构造测试',
                collapsed: true,
                items: [
                  { text: '软件构造', link: '/软件工程/软件构造.md' },
                  { text: '代码设计', link: '/软件工程/代码设计.md' },
                  { text: '软件测试', link: '/软件工程/软件测试.md' }
                ]
              },
              {
                text: '交付演化',
                collapsed: true,
                items: [
                  { text: '软件维护与演化', link: '/软件工程/软件维护与演化.md' },
                  { text: '软件开发过程模型', link: '/软件工程/软件开发过程模型.md' },
                ]
              }
            ]
          },
          { text: '编译原理', 
            collapsed: true,
            items: [
              { text: '编译原理的一些基本概念', link: '/编译原理/编译原理的一些基本概念.md' },
              { text: '有穷自动机', link: '/编译原理/有穷自动机.md' },
              { text: '中间代码生成 LLVM IR', link: '/编译原理/中间代码生成 LLVM IR.md' },
              { text: 'LR(0) 语法分析', link: '/编译原理/LR(0) 语法分析.md' },
            ]
          },
          { text: '操作系统',
            collapsed: true,
            items: [
              { text: '并发',
                collapsed: true,
                items: [
                  { text: '并发的概念', link: '/操作系统/并发/并发的概念.md' },
                  { text: 'PV操作', link: '/操作系统/并发/PV操作.md' },
                  { text: '管程', link: '/操作系统/并发/管程.md' }
                ] 
              }
            ]
          },
          { text: 'QEMU虚拟机',
            collapsed: true,
            items: [
              { text: 'QEMU虚拟机简介',
                link: '/qemu虚拟机/qemu简介'
              },
              {
                text: '安装QEMU',
                link: '/qemu虚拟机/安装qemu'
              },
              {
                text: '创建并运行虚拟机',
                link: '/qemu虚拟机/创建qemu虚拟机'
              },
              {
                text: '杂项',
                link: '/qemu虚拟机/一些杂项'
              }
            ]
          },
          { text: '数理逻辑',
            collapsed: true,
            items: [
              {
                text: '集合',
                link: '/数理逻辑/集合'
              }
            ]
          },
          { text: '嵌入式系统概论',
            collapsed: true,
            items: [
              {
                text: '嵌入式开发简述',
                link: '/嵌入式/嵌入式开发简述'
              }
            ]
          },
          { text: 'C++高级程序设计',
            collapsed: true,
            items: [
              {
                text: 'C++简述',
                link: '/C++高级程序设计/c++概述'
              }
            ]
          },
          { text: '形式语言与自动机',
            collapsed: true,
            items: [
              {
                text: 'Intro',
                link: '/形式语言与自动机/Intro'
              }
            ]
          },
          { text: '机器学习',
            collapsed: true,
            items: [
              {
                text: '机器学习简述',
                link: '/机器学习/机器学习简述'
              }
            ]
          },
          { text: 'DevOps',
            collapsed: true,
            items: [
              {
                text: 'DevOps简述',
                link: '/DevOps/DevOps简述'
              }
            ]
          },
          { text: '数海札记文章',
            collapsed: true,
            items: [
              {text: '积分视角下的均值不等式', link: '/数海札记/积分视角下的均值不等式'},
              {text: 'Gamma函数的唯一性', link: '/数海札记/Gamma函数的唯一性'}
            ]
          },
          { text: '兴趣使然的时光小记',
            collapsed: true,
            items: [
              { text: '南京', link: '/兴趣使然的时光小记/南京/南京' },
            ]
          },
          {
            text: '美雪集',
            collapsed: true,
            // items: [
            //   { text: '恶女', link: '/Miyuki/悪女/悪女' },
            // ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xing-junyang' }
    ],

    search: {
      provider: 'local',
      options: {
        locales:{
          root: {
            translations: {
              button: {
                buttonText: '搜尋本站',
                buttonAriaLabel: '搜尋本站上的內容'
              },
              modal: {
                noResultsText: '無相關內容',
                resetButtonTitle: '清空搜索條件',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉此頁面'
                }
              }
            }
          }
        }
      }
    },
    lastUpdated: {
      text: "最後更新於",
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'full',
      }
    },
    notFound:{
      title: 'Ah...404',
      quote: '小金魚不知道您要去向哪裡⋯⋯',
      linkText: '回到主頁吧',
      linkLabel: '回到主頁'
    },

    docFooter: {
      prev: '上一個頁面',
      next: '下一個頁面'
    },

    outline: {
      level: [1,6],
      label: '本頁面'
    },
  },
  lastUpdated: true,
  
})