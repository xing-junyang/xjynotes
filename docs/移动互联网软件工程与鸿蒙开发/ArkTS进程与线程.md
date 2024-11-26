# ArkTS 进程与线程相关

## 异步

**异步**指程序在执行某些操作时不必要等待其完成，而可以执行其他的操作。当异步操作完成时，程序会得到通知并处理结果。异步与同步是相对的。总的来说，异步操作是通过并发的方式来提高程序的性能，但也需要注意异步的调用**顺序**和**时机**。

ArkTS 支持标准的 `JavaScirpt` 异步语法 `async/await`，并引入了 `Promise` 作为异步操作的基础。也就是说，下文这一块都和 `JavaScript` 异步操作相近。

### Promise

`Promise` 是一种用于处理异步操作的对象。`Promise` 对象有三种状态：`pending`、`fulfilled` 和 `rejected`。`Promise` 对象的状态一旦变为 `fulfilled` 或 `rejected`，就会调用相应的回调函数：`resolve` 和 `reject`。

```typescript
const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        const value = Math.random();
        if (value > 0.5) {
            resolve(value);
        } else {
            reject(value);
        }
    }, 1000);
});

promise.then((value: number) => {
    console.log(`Fulfilled: ${value}`);
}).catch((value: number) => {
    console.log(`Rejected: ${value}`);
});
```

之后，在调用这个 `Promise` 对象时，可以使用 `then` 方法**重写** `resolve` 回调函数、`catch` 方法**重写** `reject` 回调函数。也就是说，`catch` 和 `then` 方法一定在 `Promise` 对象的函数体**执行后**进行。

### async/await

将 `async/await` 和 `Promise` 配合可以实现**同步**风格的异步编程，相当于一种**语法糖**。我们可以在函数前面加上 `ansyc` 将其变为异步函数。假设这一函数原来返回 `string` 类型，现在就应当返回 `Promise<string>` 类型。一般的操作是在该函数中创建一个 `Promise` 对象或者调用另一个异步函数，然后返回 `Promise` 对象。

```typescript
async function asyncFunction(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello, World!');
        }, 1000);
    });
}
```

在调用这个异步函数时，可以使用 `await` 关键字**等待**异步函数的返回值。`await` 关键字只能在异步函数中使用，否则会报错。

```typescript
async function main() {
    const value: string = await asyncFunction();
    console.log(value);
}
```

我们可以看出，使用了 `await` 后，函数**返回值**又变成了 `string` 类型，相当于进行了解包。这样，我们就可以**利用 `async/await`，类似同步地进行异步操作**。

## 并发模型

并发模型是用来实现**不同应用场景**中并发任务的**编程模型**，常⻅的并发模型分为**基于内存共享的**并发模型和**基于消息通信的**并发模型。

- **基于内存共享的**并发模型：多个线程共享同一块内存，通过**进程锁**来保证数据的一致性。
- **基于消息通信的**并发模型：多个线程之间通过**消息传递机制**来进行通信，不共享内存。
  - **Actor 模型**：将并发任务封装为一个个独立的 Actor（角色），角色独占内存，通过序列化通信将结果不断发送给其他角色消费（在 ArkTS 中，一般为 `UI` 线程）。
  - **TaskPool** 机制：在主线程封装任务抛给**任务队列**，系统选择合适的工作线程，进行任务的分发及执行，再将结果返回给主线程。
  - **Worker** 机制：为应用程序提供**多线程**的运行环境，实现宿主线程**分离**，避免类似于计算密集型或高延迟的任务阻塞宿主线程的运行。每个 Worker 启动存在一定的内存开销，需要**限制 Worker 的子线程数量**。

一般来说，**大量**或者**调度点较分散**的任务适合使用 `TaskPool` 机制，而**计算密集型、长时间运行、有关联的同步**任务适合使用 `Worker` 机制。

可以参阅 [多线程并发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/multithread-concurrency-V5) 和 [CPU 密集型任务开发指导 ](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/cpu-intensive-task-development-V5) 来查看更多示例。

## Stage 模型的应用间跳转

应用间跳转对于手机应用来说十分常见（比如，万恶的摇一摇开屏广告），它指从一个应用跳转到另一个应用、传递相应的数据并执行功能。在 ArkTS 中，通常有两种应用间跳转的方式：

- **拉起指定应用**：明确指定跳转的目标应用，实现应用跳转。从 `API 12` 开始，应当使用**应用链接**来拉起目标应用页面。
- **拉起指定类型的应用**：通过指定应用类型，拉起**垂类应用面板**。

::: tip 应用链接

应用链接是指可以将用户引导至**特定应用内特定位置**或**相关网⻚**（如果未安装目标应用）的 `URL`。它的运作机制如下：

- 目标应用在配置文件中注册自己的 `URL`。可以查看 [被拉起应用开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/app-linking-startup-V5#section2860153314525)
- 发起跳转的应用（拉起方）使用 [`openLink`](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-inner-application-uiabilitycontext-V5#uiabilitycontextopenlink12) 接口传入 `URL` 进行跳转。

> 推荐使用 `App Linking` 实现，这样可以提高安全性并实现未安装自动跳转网页。

:::

## Stage 模型的进程和线程

### 进程

系统中进程包括：
- **主进程**：应用中（同一 `Bundle` 名称）的所有 `UIAbility`、 `ServiceExtensionAbility` 和 `DataShareExtensionAbility` 均是运行在同一个进程中，如下图中绿色部分的 “`Main Process`”。
- **辅助进程**：应用中的所有同一类型 `ExtensionAbility` 均是各自运行在一个独立进程中，如下图中蓝色部分的 “`FormExtensionAbility Process`”、“`InputMethodExtensionAbility Process`”、其他 `ExtensionAbility Process`。
- **WebView**：`WebView` 拥有独立的渲染进程，如下图中⻩色部分的 “`Render Process`”。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src='/image/Screen Shot 2024-11-26 at 9.16.58 PM.png' alt="" style="width: 50%"></img>
    <p style="font-size: 12px; color: gray;">进程模型</p>
</div>

系统应用还可以申请多进程权限，相当于有多个上述的进程模型。

### 线程

线程是进程中的执行单元，一个进程可以包含多个线程。线程之间共享进程的资源，但可以执行不同的任务。在 ArkTS 中，线程主要有以下几种：

- **主线程**：负责 **`UI` 绘制**、**管理主线程和其他线程**的 ArkTS 引擎实例、**分发交互事件**等。
- **工作线程**：如前文介绍的 `TaskPool` 和 `Worker` 线程。