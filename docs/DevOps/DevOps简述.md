# DevOps简述
## $\mathrm{DevOps}$ 出现的背景

在上世纪八九十年代，将**软件开发**和**运维**的结合起来的提议开始萌芽。大概在 $2007$ 年左右，软件开发的人们发现，编写创建软件与部署支持软件的行业的相对独立，正在软件开发中造成致命的功能障碍。于是，在 $2009$ 年，首次 $\mathrm{DevOps~Days}$ 召开。

$\mathrm{DevOps}$ 即由 $Dev\mathrm{elopment}$ 和 $Op\mathrm{eration}s$ 结合而成，代表了**软件开发人员**和**运维技术人员**之间紧密沟通合作。$\mathrm{DevOps}$​ 通过自动化“**软件交付**”和“**架构变更**”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。

可以把 $\mathrm{DevOps}$ 看作**开发**（即软件工程相关）、**技术运营**（$\mathrm{Operations}$）和**质量保障**（$\mathrm{QA,~Quality~Assurance}$）三者的交集，如下图所示。

<div align=center>
<p><a href="https://commons.wikimedia.org/wiki/File:Devops.svg#/media/File:Devops.svg"><img src="/image/Devops.svg" alt="Devops.svg" height="486" width="512"></a>
<div style="font-size: 12px; color: gray;">
<br>Author <a href="//commons.wikimedia.org/wiki/File:Devops.png" title="File:Devops.png">Devops.png</a>: <a href="//commons.wikimedia.org/w/index.php?title=User:Rajiv.Pant&amp;action=edit&amp;redlink=1" class="new" title="User:Rajiv.Pant (page does not exist)">Rajiv.Pant</a><br>Derivative work: <a href="//commons.wikimedia.org/wiki/User:Wylve" title="User:Wylve">Wylve</a> - This file is from： <a href="//commons.wikimedia.org/wiki/File:Devops.png" title="File:Devops.png">Devops.png</a>:&nbsp;<span typeof="mw:File"><a href="//commons.wikimedia.org/wiki/File:Devops.png" class="mw-file-description"></a></span>，<a href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons Attribution 3.0">CC BY 3.0</a>，<a href="https://commons.wikimedia.org/w/index.php?curid=20202905">Link</a>
</div>
</p>
</div>

::: tip The Three Ways —— $\mathrm{DevOps}$ 化的三个关键实践

### The First Way: **Flow/Systems Thinking**

以整个系统的宏观视角**充分理解工作流**（开发-运维-客户）、实现**流量最大化**，并不断为了整体目标的实现而**优化工作流。**

部分的关键实践和方法：

- 持续构建、集成以及交付
- 按需创建环境
- 限制半成品（$\mathrm{WIP}$）
- 构建支持顺利变更的监视系统和安全系统（如看板可帮助任务可视化）

### The Second Way: **Amplify Feedback Loops**

价值流的快速持续反馈，并在反馈中快速发现并修复问题，避免问题再次发生。从源头上保证质量。

部分的关键实践和方法：

- 适时停止生产线
- 持续改进
- 构建自动化测试套件，确保代码高可部署

### The Third Way: **Culture of Continual Experimentation and Learning**

在不断尝试、重复和练习之中，创建并培育出良好的企业文化。**”企业文化“**

部分关键实践和方法：

- 营造勇于创新、敢于冒险以及高度信任的企业文化
- 确保至少 $20\%$ 的资源投入在非功能需求上
- 不断鼓励和强化改进

:::

## 精益生产、 $\mathrm{DevOps}$ 和敏捷方法

传统行业的精益生产理论和 $\mathrm{DevOps}$ 有着异曲同工之处。精益理论包括降低批量规模、减少半成品（WIP）、缩短并且增强反馈回路。

$\mathrm{DevOps}$ 并不等同于敏捷方法，敏捷方法只是 $\mathrm{DevOps}$ 的一种类似的开发思想，但是 $\mathrm{DevOps}$ 的范围比敏捷方法更加广阔。

例如，如何用敏捷的方式来做运维？利用代码来做实际的运维，即 "Infrastructure is code."。这就借鉴了敏捷中的原则。

敏捷方法更注重开发阶段的效率，而 $\mathrm{DevOps}$ 则看重软件整个生命周期上的连续性。敏捷方法中的实践包括 $\mathrm{CI}$ 持续集成，而 $\mathrm{DevOps}$ 则注重 $\mathrm{CD}$，即整体的持续部署和交付。

其实，有些敏捷宣言的内容甚至与  $\mathrm{DevOps}$ 的理念相悖。例如，敏捷宣言认为个体和互动高于流程和工具；但对于功能的部署上线而言，流程和工具显然是更重要的。再如，敏捷宣言认为工作的系统高于详尽的文档，但如果一个功能要上线，那文档是不可或缺的，这时就可以利用 $\mathrm{DevOps}$ 中文档自动化的思想来辅助文档的生成。

##  $\mathrm{DevOps}$ 的原则

- ﻿我们最重要的目标是通过**持续不断地及早交付**有价值的功能使客户满意。
- ﻿软件功能只有在完善的系统**交付给客户后才能实现**，对于用户来说，非功能性需求与功能性需求一样重要。
- ﻿**基础设施是代码**，应该同样进行开发和管理。
- **积极面对需求交化**，即使在开发后期也一样。
- ﻿**经常地交付可工作的功能**，相隔几星期或一两个月，倾向于采取较短的周期。
- ﻿**业务人员、开发人员和运维人员必须相互合作**，项目中的每一天都不例外。
- ﻿**激发个体的斗志**，以他们为核心措建项目。提供所需的环境和支援，辅以信任，从而达成目标
- ﻿不论团队内外，传递信息效果最好效率也最高的方式是面对面的交谈。
- ﻿**可工作的软件并进行完整交付**是进度的首要度量标准。
- 敏捷过程倡导**可持续开发**。责任人，开发人员、运维人员和用户要能共同维持其步调稳定延续。
- ﻿**坚持不懈地追求技术卓越和良好设计**，敏捷能力由此增强。
- ﻿**以简洁为本**，它是极力减少不必要工作量的艺术。

::: tip 一些关键术语

- 持续集成（$\mathrm{Continuous~Integration,~CI}$）：是一种开发实践，要求开发者一天多次将代码集成到共享仓库中。持续集成的核心是**自动化构建**和**测试**。
- 持续交付（$\mathrm{Continuous~Delivery,~CD}$）：一系列过程和实践，可以显著移除项目进程中的浪费，在客户与公司之间构建一种高速高效的交付和高反馈的循环。
- 持续部署（$\mathrm{Continuous~Deployment,~CD}$）：可以迅速地部署到实际环境和应用变更。
- 软件即服务（$\mathrm{SaaS}$）：软件按照订阅的方式直接分发，由中心提供支持。如今大部分软件的形式
- 基础设施即服务（$\mathrm{IaaS}$）：如云虚拟化主机等
- 平台即服务（$\mathrm{PaaS}$）：制造商提供一个开发环境供应用开发者开发。如微信小程序平台等。

:::