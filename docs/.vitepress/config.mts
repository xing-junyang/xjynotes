import {defineConfig, useRoute} from 'vitepress'
import timeline from "vitepress-markdown-timeline";

// https://vitepress.dev/reference/site-config
// @ts-ignore
export default defineConfig({
  title: "小金魚的筆記本",
  description: "這是小金魚的軟工學習筆記",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/image/logo.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/image/logo.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/image/logo.png"}],
    ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/image/logo.png", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/image/logo.png"}],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  markdown: {
    math: true,
    image:{lazyLoading: true},
    lineNumbers: true,

    //时间线
    config: (md) => {
      md.use(timeline);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主頁 🖥', link: '/' },
      { text: '筆記 📒', link: '/简介.md' },
      { text: '照片 🎞', link: '/兴趣使然的时光小记/南京/南京.md' },
      { text: '关于 🧑‍💻', link: '/about.md'},
      { text: '<text style="color:black; font-weight: 600; border-radius:16px; background-color:rgba(255, 182, 193, 1); padding: 8px 14px;"> Love Anniversary💕 </text>', link:'https://lesliexjy.com'}
    ],
    logo: '/image/logo.png',
    externalLinkIcon: true,
    footer: {
      message: 'Version 1.1. Released under the MIT License. Using <a href="https://vuejs.org">Vue.js</a> to build.<br><span style="font-weight: bolder; color:#3b3b85;">XJYNOTES © 2024 - Present</span>',
      copyright: ''
    },
    sidebar: [
      {
        items: [
          { text: '简介', link: '/简介' },
          { text: '<p style="font-weight: 900;color:#3b3b85;">软件工程基础</p>',
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
                  { text: '软件构造 (TODO)', link: '/软件工程/软件构造.md' },
                  { text: '代码设计 (TODO)', link: '/软件工程/代码设计.md' },
                  { text: '软件测试 (TODO)', link: '/软件工程/软件测试.md' }
                ]
              },
              {
                text: '交付演化',
                collapsed: true,
                items: [
                  { text: '软件维护与演化 (TODO)', link: '/软件工程/软件维护与演化.md' },
                  { text: '软件开发过程模型 (TODO)', link: '/软件工程/软件开发过程模型.md' },
                ]
              }
            ]
          },
          { text: '<p style="font-weight: 900;color:#3b3b85;">C++高级程序设计</p>',
            collapsed: true,
            items: [
              {
                text: 'C++简述',
                link: '/C++高级程序设计/c++概述'
              },
              {
                text: '结构化编程',
                link: '/C++高级程序设计/结构化编程'
              },
              {
                text: '泛型编程',
                link: '/C++高级程序设计/泛型编程'
              },
              {
                text: '面向对象编程初步',
                link: '/C++高级程序设计/面向对象编程初步'
              }
            ]
          },
          { text: '<p style="font-weight: 900;color:#3b3b85;">机器学习</p>',
            collapsed: true,
            items: [
              {
                text: '数学基础补充',
                link: '/机器学习/数学基础补充'
              },
              {
                text: '机器学习简述',
                link: '/机器学习/机器学习简述'
              },
              {
                text: '模型评估与选择',
                link: '/机器学习/模型评估与选择'
              },
              {
                text: '线性模型',
                link: '/机器学习/线性模型'
              },
              {
                text: '决策树模型',
                link: '/机器学习/决策树模型'
              },
              {
                text: 'k-近邻',
                link: '/机器学习/k-近邻'
              },
              {
                text: '支持向量机',
                link: '/机器学习/支持向量机'
              },
              {
                text: '聚类',
                link: '/机器学习/聚类'
              },
              {
                text: '神经网络',
                link: '/机器学习/神经网络'
              },
              {
                text: '卷积神经网络',
                link: '/机器学习/卷积神经网络'
              },
              {
                text: '补充内容',
                collapsed: true,
                items: [
                  {
                    text: '自然语言处理 NLP',
                    link: '/机器学习/自然语言处理'
                  },
                ]
              }
            ]
          },
          { text: '<p style="font-weight: 900;color:#3b3b85;">形式语言与自动机<br>(In English)</p>',
            collapsed: true,
            items: [
              {
                text: 'Intro',
                link: '/形式语言与自动机/Intro'
              },
              {
                text: 'Finite Automata',
                link: '/形式语言与自动机/Finite Automata'
              },
              {
                text: 'Regular Expression',
                link: '/形式语言与自动机/Regular Expression'
              },
              {
                text: 'Decision Properties of Regular Languages',
                link: '/形式语言与自动机/Decision Properties of RL'
              },
              {
                text: 'Closure Properties of Regular Languages',
                link: '/形式语言与自动机/Closure Properties of RL'
              },
              {
                text: 'Context-Free Grammar',
                link: '/形式语言与自动机/Context-Free Grammar'
              },
              {
                text: 'Parse Trees',
                link: '/形式语言与自动机/Parse Trees'
              },
              {
                text: 'Pushdown Automata',
                link: '/形式语言与自动机/Pushdown Automata'
              },
              {
                text: 'The Pumping Lemma for Context-Free Languages',
                link: "/形式语言与自动机/The Pumping Lemma for CFL's"
              },
              {
                text: 'Properties of Context-Free Languages',
                link: '/形式语言与自动机/Properties of Context-Free Languages'
              },
              {
                text: 'Turing Machines',
                link: '/形式语言与自动机/Turing Machine'
              },
              {
                text: 'Decidability',
                link: '/形式语言与自动机/Decidability'
              }
            ]
          },
          { text: '<p style="font-weight: 900;color:#3b3b85;">软件测试</p>',
            collapsed: true,
            items: [
              {
                text: '软件测试简述',
                link: '/软件测试/软件测试简述'
              },
              {
                text: '变异测试',
                link: '/软件测试/变异测试'
              },{
                text: '模糊测试',
                link: '/软件测试/模糊测试'
              },{
                text: '回归测试',
                link: '/软件测试/回归测试'
              },{
                text: '测试预言',
                link: '/软件测试/测试预言'
              },{
                text: 'Web 测试概述',
                link: '/软件测试/Web 测试概述'
              },{
                text: '移动 GUI 测试',
                link: '/软件测试/移动 GUI 测试'
              }
            ]
          },
          {
            text: '人机交互系统',
            collapsed: true,
            items: [
              {
                text: '人机交互系统简述',
                link: '/人机交互系统/人机交互系统概述'
              },
              {
                text: '交互设计的原则和目标',
                link: '/人机交互系统/交互设计的原则和目标'
              },
              {
                text: '交互设计的需求获取',
                link: '/人机交互系统/交互设计的需求获取'
              },
              {
                text: '评估的基础知识',
                link: '/人机交互系统/评估的基础知识'
              },
              {
                text: '观察和询问',
                link: '/人机交互系统/观察和询问'
              },
            ]
          },
          { text: '嵌入式系统概论',
            collapsed: true,
            items: [
              {
                text: '嵌入式开发简述',
                link: '/嵌入式/嵌入式开发简述'
              },
              {
                text: '存储器架构',
                link: '/嵌入式/存储器架构'
              },
              {
                text: '基于总线的计算机系统',
                items: [{
                    text: 'I/O 接口与设备',
                    link: '/嵌入式/基于总线的计算机系统/输入输出接口与设备'
                  },
                  {
                    text: '总线',
                    link: '/嵌入式/基于总线的计算机系统/总线'
                }]
              },
              {
                text: '嵌入式软件系统概述（TODO）',
                link: '/嵌入式/嵌入式软件系统概述'
              },
              {
                text: '嵌入式操作系统概述',
                link: '/嵌入式/嵌入式操作系统概述'
              },
              {
                text: '实时调度（TODO）',
                link: '/嵌入式/实时调度'
              },
              {
                text: 'ROS概述',
                link: '/嵌入式/ROS概述'
              }
            ]
          },
          { text: 'DevOps',
            collapsed: true,
            items: [
              {
                text: 'DevOps简述',
                link: '/DevOps/DevOps简述'
              },
              {
                text: '云计算 (TODO)',
                link: '/DevOps/云计算'
              },
              {
                text: 'DevOps中的过程方法',
                link: '/DevOps/DevOps中的过程方法'
              }
            ]
          },
          { text: '移动互联网软件工程（鸿蒙开发）',
            collapsed: true,
            items: [
              {
                text: '移动互联网软件工程（鸿蒙开发）概述',
                link: '/移动互联网软件工程与鸿蒙开发/概述'
              },
              {
                text: 'HarmonyOS 开发',
                collapsed: false,
                items: [
                  {
                    text: 'HarmonyOS简述',
                    link: '/移动互联网软件工程与鸿蒙开发/Harmony概述'
                  },
                  {
                    text: 'ArkTs语言（TODO）',
                    link: '/移动互联网软件工程与鸿蒙开发/ArkTs语言'
                  },
                  {
                    text: 'ArkUI（TODO）',
                    link: '/移动互联网软件工程与鸿蒙开发/ArkUI'
                  },
                  {
                    text: '鸿蒙应用框架',
                    link: '/移动互联网软件工程与鸿蒙开发/鸿蒙应用框架'
                  }
                ]
              },
              {
                text: '移动互联网应用需求分析',
                link: '/移动互联网软件工程与鸿蒙开发/移动互联网应用需求分析'
              },
              {
                text: '架构设计',
                link: '/移动互联网软件工程与鸿蒙开发/架构设计'
              },
              {
                text: '高可用和高并发',
                link: '/移动互联网软件工程与鸿蒙开发/高可用和高并发'
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
                  { text: 'PV操作 (TODO)', link: '/操作系统/并发/PV操作.md' },
                  { text: '管程 (TODO)', link: '/操作系统/并发/管程.md' }
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
          { text: '数海札记文章',
            collapsed: true,
            items: [
              {text: '积分视角下的均值不等式', link: '/数海札记/积分视角下的均值不等式'},
              {text: 'Gamma函数的唯一性', link: '/数海札记/Gamma函数的唯一性'},
              { text: '数理逻辑',
                collapsed: true,
                items: [
                  {
                    text: '集合',
                    link: '/数理逻辑/集合'
                  },{
                    text: '集合进阶',
                    link: '/数理逻辑/集合进阶'
                  },{
                    text: '命题逻辑',
                    link: '/数理逻辑/命题逻辑'
                  },{
                    text: '归纳和递归',
                    link: '/数理逻辑/归纳和递归'
                  },{
                    text: '命题联结词',
                    link: '/数理逻辑/命题联结词'
                  }
                ]
              },
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
      { icon: 'github', link: 'https://github.com/xing-junyang' },
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
  router: {
    prefetchLinks: true,
  }

})