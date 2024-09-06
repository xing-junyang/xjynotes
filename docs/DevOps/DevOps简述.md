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

::: tip The Three Ways —— $\mathrm{DevOps}$ 的基石准则

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
