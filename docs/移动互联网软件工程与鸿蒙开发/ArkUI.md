## 组件和页面的生命周期

⻚面生命周期，即被 `@Entry` 装饰的组件生命周期，提供以下生命周期接口：
`onPageShow`：⻚面每次显示时触发。
`onPageHide`：⻚面每次隐藏时触发一次。
`onBackPress`：当用户点击返回按钮时触发。
组件生命周期，即一般用@Component装饰的自定义组件的生命周期，提供以下生命周期接口：
`aboutToAppear`：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其 `build()` 函数之前执行。
`aboutToDisappear`：在自定义组件即将析构销毁时执行。

## 状态管理

用户通过触发组件的事件方法，改变状态数据。状态数据的改变，引起UI的重新渲染。

### 组件级别的状态管理

**@State**：`@State` 装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。
**@Prop**：`@Prop` 装饰的变量可以和父组件建立单向同步关系，`@Prop` 装饰的变量是可变的，但修改不会同步回父组 件。
**@Link**：`@Link` 装饰的变量和父组件构建双向同步关系的状态变量，父组件会接受来自 `@Link` 装饰的变量的修改的同步，父组件的更新也会同步给 `@Link` 装饰的变量。
**@Provide/@Consume**：`@Provide/@Consume` 装饰的变量用于跨组件层级（多层组件）同步状态变量，可以不需要通过参数命名机制传递，通过 `alias` 或者属性名绑定。
**@Observed**：`@Observed` 装饰 `class`，需要观察多层嵌套场景的 `class` 需要被 `@Observed` 装饰。单独使用 `@Observed` 没有任何作用，需要和 `@ObjectLink`、`@Prop` 连用。
**@ObjectLink**：`@ObjectLink` 装饰的变量接收 `@Observed` 装饰的 `class` 的实例，应用于观察多层嵌套场景，和父组件的数据源构建双向同步。

### 应用级别的状态管理

`AppStorage` 是应用程序中的一个特殊的**单例** `LocalStorage` 对象，是应用级的数据库，和进程绑定，通过 `@StorageProp` 和 `@StorageLink` 装饰器可以和组件联动。
`AppStorage` 是应用状态的“中枢”，需要和组件（UI）交互的数据存入 `AppStorage`，比如持久化数据 `PersistentStorage` 和环境变量 `Environment`。`UI` 再通过 `AppStorage` 提供的装饰器或者 API 接口，访问这些数据;
框架还提供了 `LocalStorage`，`AppStorage` 是 `LocalStorage` 特殊的单例。 `LocalStorage` 是应用程序声明的应用状态的内存“数据库”，通常用于⻚面级的状态共享，通过`@LocalStorageProp` 和 `@LocalStorageLink` 装饰器可以和 UI 联动。

## 渲染控制

可以用一些简单的分支和循环语句来构建界面或对界面产生更改。

- `if/else` 分支：`if`、`else if` 之后的条件语句可以使用 `@State` 修饰的状态变量以及普通的静态变量。只有使用 `@State` 修饰的状态变量时才会作用与界面。
  当if、else if后跟随的状态判断中使用的状态变量值变化时，条件渲染语句会进行更新，更新步骤如下：

  1. 评估if和else if的状态判断条件，如果分支没有变化，无需执行以下步骤。如果分支有变化，则执行2、3步骤：
  2. 删除此前构建的所有子组件。
  3. 执行新分支的构造函数，将获取到的组件添加到if父容器中。如果缺少适用的else分支，则不构建任何内容。

  此内容来自华为官方网站，更多的内容可访问[华为官方网站](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-rendering-control-ifelse-V5)查看。

- `ForEach`：必须在容器组件内使用；生成的子组件应当是允许包含在ForEach父容器组件中的子组件。允许子组件生成器函数中包含 `if/else` 条件渲染，同时也允许 `ForEach` 包含在 `if/else` 条件渲染语句中。

  例如，下面的代码可以循环生成 "one"、"two" 和 "three" 组件

  ```typescript
  @Entry
  @Component
  struct Parent {
    @State simpleList: Array<string> = ['one', 'two', 'three'];
  
    build() {
      Row() {
        Column() {
          ForEach(this.simpleList, (item: string) => {
            ChildItem({ item: item })
          }, (item: string) => item)
        }
        .width('100%')
        .height('100%')
      }
      .height('100%')
      .backgroundColor(0xF1F3F5)
    }
  }
  
  @Component
  struct ChildItem {
    @Prop item: string;
  
    build() {
      Text(this.item)
        .fontSize(50)
    }
  }
  ```

- `LazyForEach`：从提供的数据源中按需迭代数据，并在每次迭代过程中创建相应的组件。当在滚动容器中使用了 `LazyForEach`，框架会根据滚动容器可视区域按需创建组件，当组件滑出可视区域外时，框架会进行组件销毁回收以降低内存占用。只有在特定容器组件 [List](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-container-list-V5)、[Grid](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-container-grid-V5)、[Swiper ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-container-swiper-V5)以及 [WaterFlow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-container-waterflow-V5)中才能使用。

## 布局结构

### **布局元素**的组成

- **组件区域**（蓝区方块）：组件区域表明组件的大小，`width`、`height` 属性设置该区域的大小。
- **组件内容区**（⻩色方块）：组件区域大小减去组件的 `padding` 值，组件内容区大小会作为组件内容（或者子组件）进行大小测算时的布局测算限制。
- **组件内容**（绿色方块）：组件内容本身占用的大小，比如文本内容占用的大小。组件内容和组件内容区不一定匹配，比如设置了固定的 `width` 和 `height`，此时组件内容区大小就是设置的`width` 和 `height` 减去 `padding` 值，但文本内容则是通过文本布局引擎测算后得到的大小，可能出现文本真实大小小于设置的组件内容区大小。当组件内容和组件内容区大小不一致时，align属性生效，定义组件内容在组件内容区的对⻬方式，如居中对⻬。
- **组件布局边界**（虚线部分）：组件通过 `margin` 属性设置外边距时，组件布局边界就是组件区域加上 `margin` 的大小。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Screen Shot 2024-09-27 at 3.36.22 PM.png' alt="" style="width:70%;"></img>
    <p style="font-size: 12px; color: gray;">组件的布局示意图</p>
  </div>

### 常见的布局

- **线性布局** `Row/Column`：线性排列子元素。
- **层叠布局** `Stack`：组件需要有堆叠效果的时候优先考虑此布局，层叠布局的堆叠效果不会占用或影响同容器内部子组件的布局空间。
- **弹性布局** `Flex`：和线性布局类似，但弹性布局默认子组件可以压缩或者拉伸。
- **相对布局** `RelativeContainer`：是在二维空间中的布局方式，它不需要遵循线性布局的规划，布局方式更为自由。它主要通过在子组件上面设置锚点规则来对齐。
- **栅格布局** `GridRow/GridCol`：将空间分隔为有规律的栅格。它可以实现不同设备下不同的布局。
- **列表** `List`：可以轻松高效地显示结构化且可滚动的信息。
- **网格** `Grid`：具有很强的页面均分能力和子组件占比控制能力，是一种重要的自适应布局。
- **轮播** `Swiper`：一般用于广告轮播、图片预览和可滚动应用等。

## 添加组件

常用的组件有**按钮、进度条、文本、图片、动画和菜单**等，它们都可以与事件进行绑定，实现响应式的设计。具体的用法可在[华为官网](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-add-component-V5)上查阅。

## UI 渲染原理

HarmonyOS 中的 UI 框架是 ACE UI。ACE 全称是 Ability Cross-platform Environment (元能力跨平台执行环境)，它结合 HarmonyOS 的基础运行单元 Ability，语言和运行时，以及各种平台（OS）能力 API 等共同构成 HarmonyOS 应用开发的基础，实现了跨设备分布式调度，以及原子化服务免安装等能力。

**ACE UI** 框架具备如下特点:

- 支持主流的语言生态 **– JavaScript**
- 支持类 **Web** 开发范式， **MVVM** 机制。并在架构上可支持多前端开发范式，进一步简化开发
- 通过统一的 **UI** 后端，实现高性能以及跨平台一致化的渲染体验
- 通过多态 **UI**、原子化布局、统一交互，以及可伸缩的运行时设计，进一步降低不同设备形态下的 **UI** 开发⻔槛，并能够通过统一的开发范式，实现一套代码跨设备部署。

### UI 框架

**ACE UI** 框架层的主要组成为：

- **前端框架层**：该层主要包括相应的开发范式（比如主流的类 Web 开发范式），组件/API，以及编程模型 `MVVM(Model-View-ViewModel)`。其中 `Model` 是数据模型层，代表了从数据源读取到的数据；`View` 是视图 `UI` 层，通过一定的形式把系统中的数据向用户呈现出来；`ViewModel` 是视图模型层，是数据和视图之间的桥梁。它双向绑定了视图和数据，使得数据的变更能够及时在视图上呈现，用户在视图上的修改也能够及时传递给后台数据，从而实现数据驱动的 `UI` 自动变更。
- **桥接层**：主要是作为一个**中间层**，实现前端开发范式到底层引擎（包括 UI 后端，语言和运行时）的对接。
- **引擎层**：该层主要包含两部分：UI 后端引擎（由 C++构建的 UI 后端引擎，包括 UI 组件、布局视图、动画事件、自绘制渲染管线和渲染引擎 ）和语言执行引擎。
- **平台抽象层**：该层主要是通过平台抽象，将平台依赖聚焦到底层画布，通用线程以及事件机制等少数必要的接口上，为跨平台打造了相应的基础设施，并能够实现一致化 UI 渲染体验。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Screen Shot 2024-09-27 at 4.40.34 PM.png' alt="" style="width:70%;"></img>
    <p style="font-size: 12px; color: gray;">ACE UI 各层次</p>
  </div>

### 类 Web 开发范式和声明式开发范式

对于类 Web 开发范式组件，根据组件从前端到后端的过程，可以将整个框架划分为 `JsFrameWork`，`DomNode`, `ComPonent`，` RenderNode` 四个模块。

而对于声明式开发范式组件，根据组件从前端到后端的过程，可以将整个框架划分为 `EtsLoader`，`JsView`，`ComPonent`，`RenderNode` 四个模块。其中 `EtsLoader` 负责解析 `ets` ⻚面，根据组件的 `tag` 标签创建对应的 `JsView` 对象，生成 `jsView` 树；而 `JsView` 负责处理组件的属性，方法和事件。并通过 `Create` 函数创建对应的 `Component` 树；其余模块与类 Web 开发范式相近。

### 线程池

ACE JS应用启动时会创建一系列线程，形成独立的线程模型，以实现高性能的渲染流程。

每个ACE JS应用的进程，包含唯一一个Platform线程和若干后台线程组成的异步任务线程池：

- **Platform线程**：当前平台的主线程，也就是应用的主线程，主要负责平台层的交互、应用生命周期以及窗口环境的创建
- **后台线程池**：一系列后台任务，用于一些低优先级的可并行异步任务，如网络请求、Asset 资源加载等。除此之外，每个实例还包括一系列专有线程
- **JS线程**：JS 前端框架的执行线程，应用的 JS 逻辑以及应用 UI 界面的解析构建都在该线程执行
- **UI线程**：引擎的核心线程，组件树的构建以及整个渲染管线的核心逻辑都在该线程：包括渲染树的构建、布局、绘制以及动画调度
- **GPU线程**：现代的渲染引擎，为了充分发挥硬件性能，都支持GPU硬件加速，在该线程上，会通过系统的窗口句柄，创建 GPU 加速的 OpenGL 环境，负责将整个渲染树的内容光栅化，直接将每一帧的内容渲染合成到该窗口的 Surface 上并送显
- **IO线程**：主要为了异步的文件 IO 读写，同时该线程会创建一个离屏的GL环境，这个环境和 GPU 线程的 GL 环境是同一个共享组，可以共享资源，图片资源解码的内容可直接在该线程上传生成GPU 纹理，实现更高效的图片渲染。

### UI 渲染

对于 UI 的渲染阶段，主要有以下的几个步骤：

- **前端脚本解析**：开发者开发的应用，通过开发工具链的编译，会生成引擎可执行的 Bundle 文件。应用启动时，会将 Bundle 文件在 JS 线程上进行加载，并且将该内容作为输入，供 JS 引擎进行解析执行，**最终生成前端组件的结构化描述，并建立数据绑定关系。**
- **渲染管线构建**：前端框架解析后，根据具体的组件规范定义向前端框架对接层请求创建ACE渲染引擎提供的组件。每一个前端组件会对接到一个Composed Component，表示一个组合型的UI组件，通过不同的子 Component 组合，构造出前端对应的 Composed 组件。每个 Composed 组件是前后端对接的一个基础的更新单位。有了每个前端节点对应的 Component，就形成了一个完成 Page 的描述结构，通知渲染管线挂载新的页面。在 Page 挂载之前，渲染管线已经提前创建了几个关键的核心结构，如 **Element 树和 Render 树**。当生成了当前页面的 Element 树和 Render 树，页面渲染构建的完整过程就结束了。
- **布局和绘制**：接下来就进入了布局和绘制的阶段，布局和绘制都是在 Render 树上进行的。**布局的过程就是通过各类布局的算法计算出每个 RenderNode 在相对空间上的真实大小和位置。**同布局一样，**绘制**也是一个深度遍历的过程，遍历调用每个 RenderNode 的 Paint 方法，此时的绘制只是根据布局算出来的大小和位置，在**当前绘制的上下文记录每个节点的绘制命令。**
- **光栅化合成**：在上面的绘制流程结束后，会通知GPU线程开始进行合成的流程。合成器会从系统的窗口中获取当前的 Surface，将每个 Layer 生成的纹理进行合成，最终合成到当前 Surface 的图形内存（Graphic Buffer）中。这块内存中存储的就是当前帧的渲染结果内容。最终还需要将渲染结果提交到系统合成器中合成显示。

对于具体的**ACE UI框架渲染流程解析**，可以继续阅读[这一文章](https://developer.huawei.com/consumer/cn/forum/topic/0201632814782650414)，本文也大量引用了该文章。

