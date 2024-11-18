import type {NavData} from './types'

export const NAV_DATA: NavData[] = [
    {
        title: '学长笔记',
        items: [
            {
                icon: 'https://eaglebear2002.github.io/images/avatar.jpg',
                title: 'EagleBear2002',
                badge: {
                    text: '仍在更新',
                    type: 'tip',
                },
                desc: '暮雪朝霜，毋改英雄意气',
                link: 'https://eaglebear2002.github.io'
            },
            {
                icon: 'https://blog.lyc8503.net/img/avatar.png',
                badge: {
                    text: '仍在更新',
                    type: 'tip',
                },
                desc: '博客里什么都有',
                title: "Lyc8503's Blog",
                link: 'https://blog.lyc8503.net',
            },
            {
                icon: 'https://spricoder.github.io/img/avatar.png',
                title: 'SpriCoder的博客',
                badge: {
                    text: '仍在更新',
                    type: 'tip',
                },
                desc: '掐指一算，代码完蛋',
                link: 'https://spricoder.github.io'
            },
            {
                icon: '/icon/wbl_z.png',
                title: 'wbl_z 的博客',
                badge: {
                    text: '仍在更新',
                    type: 'tip',
                },
                desc: '有很多计组和计网资料',
                link: 'https://blog.csdn.net/m0_51691879?spm=1000.2115.3001.5343'
            },
            {
                icon: 'https://www.ydjsir.com.cn/img/favicon.png',
                title: '南雍随笔',
                badge: {
                    text: '仍在更新',
                    type: 'tip',
                },
                desc: '此时相望不相闻，愿逐月华流照君',
                link: 'https://www.ydjsir.com.cn/index.html'
            },
            {
                icon: '/icon/github.png',
                title: '专业课资料仓库',
                badge: {
                    text: '暂不更新',
                    type: 'warning',
                },
                desc: 'NJUSE-专业课仓库',
                link: 'https://github.com/NJU-SE-15-share-review/professional-class'
            },
            {
                icon: '/icon/github.png',
                title: '保研指南',
                badge: {
                    text: '暂不更新',
                    type: 'warning',
                },
                desc: '南大软院学长学姐编写的保研攻略',
                link: 'https://postgraduate-recommendation.readthedocs.io/zh_CN/latest/'
            },
        ],
    },
    {
        title: '学习资源',
        items: [
            {
                link: 'https://csdiy.wiki',
                title: 'CS 自学指南',
                badge: {
                    text: '十分全面',
                    type: 'tip',
                },
                desc: '一个拓展知识面的好地方',
                icon: 'https://csdiy.wiki/images/favicon.ico'
            },
            {
                title: 'Coursera',
                desc: '全球最大的在线课程平台',
                link: 'https://www.coursera.org',
                icon: 'https://www.coursera.org/favicon.ico'
            },
            {
                title: 'Bilibili',
                desc: '你所热爱的，就是你的生活',
                badge: {
                    text: 'B站大学',
                    type: 'tip',
                },
                link: 'https://www.bilibili.com',
                icon: 'https://www.bilibili.com/favicon.ico'
            },
            {
                title: 'OI Wiki',
                desc: '一个很全面的算法知识库',
                link: 'https://oi-wiki.org',
                icon: 'https://oi-wiki.org/favicon.ico'
            },
            {
                link: 'https://www.luogu.com.cn',
                title: '洛谷',
                desc: '国内的大型算法 OJ',
                icon: 'https://www.luogu.com.cn/favicon.ico'
            },
            {
                link: 'https://leetcode-cn.com',
                title: 'LeetCode',
                desc: '刷面试题',
                icon: 'https://leetcode-cn.com/favicon.ico'
            },
            {
                title: 'Youtube',
                desc: '油管，需要挂梯子',
                badge: {
                    text: '印度老哥',
                    type: 'warning',
                },
                link: 'https://www.youtube.com',
                icon: 'https://www.youtube.com/favicon.ico'
            },
        ]
    },
    {
        title: 'LLMs',
        items: [
            {
                icon: '/icon/chatgpt.svg',
                title: 'ChatGPT',
                badge: {
                    text: '地表最强',
                    type: 'danger',
                },
                link: 'https://chat.openai.com/chat',
                desc: '4o 非常强，但需要账号'
            },
            {
                icon: '/icon/poe.png',
                title: 'Poe',
                badge: {
                    text: 'AI综合体',
                    type: 'warning',
                },
                link: 'https://poe.com',
                desc: '汇集了许多模型，Claude 很强'
            },
            {
                icon: '/icon/kimi.ico',
                title: 'Kimi',
                badge: {
                    text: '长文本',
                    type: 'warning',
                },
                link: 'https://kimi.moonshot.cn',
                desc: '很强的国产大模型'
            },
            {
                icon: 'https://www.midjourney.com/apple-touch-icon.png',
                title: 'Midjourney',
                link: 'https://www.midjourney.com',
                desc: '能绘画的 AI'
            },
        ]
    },
    {
        title: '常用工具',
        items: [
            {
                icon: 'https://gcc.godbolt.org/favicon.ico?v=1',
                title: 'Compiler Explorer',
                desc: '查看多种架构的编译结果',
                link: 'https://gcc.godbolt.org'
            },
            {
                title: 'ProcessOn',
                desc: '在线 UML 作图工具',
                link: 'https://www.processon.com',
                icon: 'https://www.processon.com/favicon.ico'
            },
            {
                icon: '/icon/apifox.png',
                title: 'Apifox',
                desc: 'API 设计、开发、测试一体化',
                link: 'https://apifox.com'
            },
            {
                icon: 'https://tinypng.com/images/apple-touch-icon.png',
                title: 'TinyPNG',
                desc: '在线图片压缩工具',
                link: 'https://tinypng.com'
            },
            {
                icon: 'https://static.json.cn/r/img/favicon/favicon.ico',
                title: 'Json 中文网',
                desc: 'JSON 在线解析及格式化验证',
                link: 'https://www.json.cn'
            },
            {
                title: "Lambda 解释器",
                link: 'https://lambdacalc.io',
                desc: 'Lambda 演算解释器',
            }
        ]
    },
    {
        title: '前端学习资料',
        items: [
            {
                icon: '/icon/MDN.png',
                title: 'MDN | Web 开发者指南',
                desc: '广泛的 Web API 参考资料',
                link: 'https://developer.mozilla.org/zh-CN'
            },
            {
                icon: '/icons/nodejs.svg',
                title: 'Node.js',
                desc: 'JavaScript 运行环境',
                link: 'https://nodejs.org/zh-cn'
            },
            {
                icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/OTE0YTAw.png',
                title: '微信小程序文档',
                desc: '微信小程序官方开发者文档',
                link: 'https://developers.weixin.qq.com/miniprogram/dev/framework/'
            },
            {
                icon: 'https://www.tailwindcss.cn/apple-touch-icon.png',
                title: 'TailwindCSS 中文网',
                desc: '一个功能类优先的 CSS 框架',
                link: 'https://www.tailwindcss.cn'
            },
            {
                icon: 'https://cn.vuejs.org/logo.svg',
                title: 'Vue 3',
                desc: '渐进式 JavaScript 框架',
                link: 'https://cn.vuejs.org'
            },
            {
                icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
                title: 'Element Plus',
                desc: '基于 Vue 3 的组件库',
                link: 'https://element-plus.org'
            },
        ]
    },
    {
        title: '后端学习资料',
        items: [
            {
                icon: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
                title: 'MySQL',
                desc: '最流行的开源数据库',
                link: 'https://www.mysql.com'
            },
            {
                icon: 'https://www.mongodb.com/assets/images/global/favicon.ico',
                title: 'MongoDB',
                desc: '面向文档的 NoSQL 数据库',
                link: 'https://www.mongodb.com'
            },
            {
                icon: 'https://redis.io/images/favicon.png',
                title: 'Redis',
                desc: '内存中的数据结构存储',
                link: 'https://redis.io'
            },
            {
                icon: '/icon/spring.png',
                title: 'Spring',
                desc: 'Java 开发框架',
                link: 'https://spring.io'
            },
        ]
    },
    {
        title: '语言学习资料',
        items: [
            {
                icon: 'https://www.python.org/static/opengraph-icon-200x200.png',
                title: 'Python',
                desc: 'Python 官方文档',
                link: 'https://www.python.org'
            },
            {
                title: 'Cpp Reference',
                desc: 'C++ 参考手册',
                link: 'https://en.cppreference.com/w/',
                icon: 'https://en.cppreference.com/favicon.ico'
            },
            {
                title: 'Java',
                desc: 'Java 官方文档',
                link: 'https://docs.oracle.com/en/java/javase/20/docs/api/index.html',
                icon: 'https://docs.oracle.com/favicon.ico'
            },
            {
                title: 'Java Tutorial',
                desc: 'Java 入门教程',
                link: 'https://docs.oracle.com/javase/tutorial/tutorialLearningPaths.html',
                icon: 'https://docs.oracle.com/favicon.ico'
            },
            {
                title: 'scikit-learn',
                desc: 'Python 机器学习库',
                link: 'https://scikit-learn.org/stable/index.html',
                icon: 'https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png'
            }
        ]
    },
    {
        title: '社区',
        items: [
            {
                title: 'Github',
                icon: {
                    svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
                },
                desc: '不解释',
                link: 'https://github.com'
            },
            {
                icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a',
                title: 'Stack Overflow',
                desc: '有问题先去 Stack Overflow 找找',
                link: 'https://stackoverflow.com'
            },
            {
                title: 'Hugging Face',
                icon: 'https://huggingface.co/favicon.ico',
                desc: '一个大型的 NLP 社区',
                link: 'https://huggingface.co'
            },
            {
                title: '稀土掘金',
                icon: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png',
                desc: '字节的技术社区',
                link: 'https://juejin.cn'
            },
            {
                title: '博客园',
                // icon: 'https://common.cnblogs.com/favicon.ico',
                icon: '/icons/cnblogs.svg',
                desc: '顾名思义，是一个个人博客平台',
                link: 'https://www.cnblogs.com'
            },
            {
                title: '知乎',
                icon: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png',
                desc: '这个也不必解释了',
                link: 'https://juejin.cn'
            }
        ]
    },
]