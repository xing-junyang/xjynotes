# $\mathrm{C}++$ 简述

> _I have yet to see a program that can be written better in C than in C++._
> 
> —— **Bjarne Stroustrup**, founder of C++.

## 为何 $\mathrm{C/C++}$ 仍然如此重要

程序开发中存在一些权衡：
- 运行效率 $\mathrm{VS}$ 开发效率；
- 易用性 $\mathrm{VS}$ 安全性；
- $\cdots$ 

$\mathrm{C}$ 的出发点是，只要程序员在开发过程中足够精细 ，就可以极大程度上优化程序的运行效率，同时保证易用性和安全性。此外，$\mathrm{C}$ 还是各大操作系统底层开发的语言，因此其地位难以替代。

因此，$\mathrm{C}++$ 填补了编程领域的**重要生态位**：需要同时有效**使用硬件**、**提高性能**和**管理高复杂性的程序**。

 $\mathrm{C}++$ 的**宗旨**（$\mathrm{Zero-Overhead}$）：

- 你不用的就不用为此付出代价；
  $\mathrm{What~you~don't~use, ~you~ don't~ pay~ for.}$
- 你用的就不可能自己手写出更好的。
  $\mathrm{What~you~do~use,~you~couldn't~hand-code~any~better.}$​

更详细地， $\mathrm{C}++$ 的宗旨还包括：
- 不限制程序员的风格；
- 注重分划（$\mathrm{compartmentalization }$）；
- 充分相信程序员，交由程序员全权控制；
- 在编译时加强安全检查；
- 问题驱动：$\mathrm{C}++$ 是由解决现实中的问题来驱动的；
- 简单、高效（$\mathrm{Zero-Overhead}$）、稳定；
- 不专家化：并不只满足专家的需求；
- 不模仿、不迷信理论、不轻易变革（即：不随波逐流）。

##  $\mathrm{C}$ 和 $\mathrm{C}++$ 的关系

- **超集关系**
- **编程技巧相同**
- **时空开销相同**

## 程序设计

编程是**科学**和**艺术**的结合。

程序设计范式一般有两类：

- **面向步骤**：基于**步骤**和**调用**的概念。偏向图灵机的思想。
- **面向对象**：引入概念和模型来刻画现实中人与世界交互的现象。特点是**封装**和**继承**。
- **函数式**：由微小且有用的函数聚集起来，合成最终的结果。
- **逻辑式**：根据公理和推导规则进行推理，回应用户的询问。
- **并发编程**：使程序可以分发到独立的个体上运行。如多线程和并发计算等。
- **泛型编程**：将常用的数据结构和算法进行抽象，设计出效率高、可重用的库。

一般来说，一种程序设计语言可能包含多种程序设计范式。

### 面向对象程序设计的历史

- $\mathrm{Simula~67}$​：面向对象的开山之作，引入了“类”和“对象”的概念，，但性能太差，不适合实际使用。
- $\mathrm{Smalltalk}$：将“万物皆对象”的理念推向极致，将数据和功能均封装在对象内，所有操作都是对象间的消息传递。
-  $\mathrm{C}++$：继承了 $\mathrm{Simula}$ 的类、继承、多态等特性，同时保持了 $\mathrm{C}$ 语言的效率和灵活性。
- $\mathrm{Java}$：通过 $\mathrm{Java}$ 虚拟机（$\mathrm{JVM}$）实现了跨平台的应用开发，并推动了规范化的面向对象程序设计。

## $\mathrm{C}++$ 的家谱图

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column">
<img src='/image/Screen Shot 2024-09-14 at 3.29.43 PM.png' alt="" style="width:80%; margin:20px"></img>
</div>

## $\mathrm{C}++$ 的诞生

> 这一部分考试中不会涉及。

- $1979$ 年（史前）：研究分布式系统的系统软件组织。实现有 $\mathrm{Simula}$ ，可读性与层次性强但性能较差；$\mathrm{BCPL}$，调试和 debug 困难；$\mathrm{C~with~class}$，兼容 $\mathrm{C}$，且由于使用了 $\mathrm{C}$​ 的链接器，效率大大提高。
- $1983$ 年：$\mathrm{C}++$ 诞生。当时的硬件和 $\mathrm{OS}$ 运行环境以及产业界和大学的用户资源影响了语言设计的因素。
- $\mathrm{ANSI}$ 和 $\mathrm{ISO}$：抽象类、多重继承、异常和模板加入。
- $\mathrm{C++}~98$：$\mathrm{C}++$ 的第一个 $\mathrm{ISO}$ 标准。
- $\mathrm{C++} 14/17/20$：持续进化，更多库的加入，更多常用操作提供语法支持。


## $\mathrm{C}++$ 的语言特性

- **静态、强类型**
- $\mathrm{OOP}$
- **泛型编程**
- **异常处理**

## 在线编译器

<OnlineCompiler></OnlineCompiler>

<script>
import OnlineCompiler from '../.vitepress/theme/components/OnlineCompiler.vue'
export default {
  components: {
    OnlineCompiler
  }
}
</script>