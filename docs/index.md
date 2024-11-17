---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "小金鱼的"
  text: "軟工學習筆記 📒📕📘"

  image:
      src: "/image/logo_sim.svg"
      alt: XJYNOTES
  actions:
    - theme: brand
      text: 简介
      link: ./简介.md
    - theme: alt
      text: 导航
      link: ./nav/navigation.md
    - theme: alt
      text: View my GitHub
      link: https://github.com/xing-junyang
features:
  - icon: 🖥
    title: 机器学习入门
    details: 机器学习的基本概念、常用算法以及进阶知识，辅以代码实现。
    link: ./机器学习/机器学习简述.md
  - icon: 🧑‍💻
    title: 软件工程基础
    details: 贯穿整个软件开发生命周期的软件工程基础知识，包括需求分析、设计、测试等。
    link: ./软件工程/软件工程基础.md
  - icon: 🤖
    title: Formal Languages and Automata
    details: Classical formal languages, automata, computation theory, and insights into the mainstream of modeling languages.
    link: ./形式语言与自动机/Intro.md
---

<myLock />