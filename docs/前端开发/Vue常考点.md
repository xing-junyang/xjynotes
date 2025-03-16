# Vue

## 虚拟 DOM 树

虚拟 `DOM` 树是 `Vue` 的核心概念，它实际上是一个 **`JavaScript` 对象**，用来描述真实 `DOM` 树的结构。为什么要采用这种虚拟 `DOM` 树呢，好好的 `DOM` 树不好吗？

一方面是，真实 `DOM` 的属性很多，**修改 `DOM` 节点开销很大**，而虚拟 `DOM` 只是普通 `JavaScript` 对象，描述属性并不需要很多，修改开销很小。此外，我们希望利用 `JavaScript` 的强大能力来跟踪状态的变化，实现响应式，并且在状态变化时**只更新必要**的部分。另外，由于 `JavaScript` 的跨平台特性，一个虚拟 `DOM` 稍微改一改就可以在不同平台上运行，实现了**应用的跨平台**。

::: tip 使用虚拟 `DOM` 一定是更快的吗？

其实也不一定。虚拟 `DOM` 也有一定的开销，比如即使只是改了一点文字，也需要**比较新旧虚拟 `DOM` 树**，然后再更新；此外各种绑定的事件也会有一定的开销。因此，如果只是简单的页面，虚拟 `DOM` 可能并不会比直接操作 `DOM` 快。但是，对于复杂的页面，虚拟 `DOM` 的优势就体现出来了。

:::

Vue 中的虚拟 `DOM` 是通过 `VNode` 类来实现的。`VNode` 是一个**树形结构**，与真实的 `DOM` 树相对应。每个节点都有 `tag`、`data`、`children`、`text`、`elm` 等属性。

其中，`tag` 代表节点的标签名，例如 `div`、`span` 等；`data` 代表节点的数据，它是一个 `VNodeData` 类型，包含了节点的属性、事件等；`children` 代表子节点，同样是一个 `VNode` 类型的数组；`text` 代表文本内容；而 `elm` 代表对应的真实 `DOM` 节点，是一个 `HTMLElement` 类型。

## 双向绑定机制

在 Vue 的组件初始化阶段，会通过 `observe` 和 `defineReactive` 等方法对配置对象中的 `data` 和 `props` 属性进行**响应式化处理**。这一过程会为每个属性注册 `getter/setter`，同时为每个属性创建一个对应的 **Dep 实例**（依赖收集器）。Dep 实例内部维护一个订阅者数组 `subs`，用于管理依赖关系。

组件初始化完成后，会创建一个 **Watcher 实例**（与渲染逻辑绑定）。此时，Watcher 会立即调用组件的 `render` 函数生成虚拟 DOM。在调用 `render` 函数时，如果访问了 `data` 或 `props` 的属性值，便会触发属性的 `getter`。此时，Vue 通过 `Dep.target`（一个全局指针，指向当前正在计算的 Watcher）将 Watcher 注册到对应属性的 Dep 实例中（即 `dep.depend()`），完成**依赖收集**。

当修改 `data` 或 `props` 的属性值时，会触发属性的 `setter`。此时，`setter` 会调用 `dep.notify()`，通知 Dep 实例中所有订阅的 Watcher 执行 `update` 逻辑。Watcher 的 `update` 方法会将自身加入**异步更新队列**，在下一个事件循环中批量执行重新渲染（通过 `render` 生成新虚拟 DOM 并 patch 到真实 DOM）。

::: warning `computed` 和 `watch` 的响应式

对于 **`computed` 计算属性**而言，实际上会在内部创建一个 computed watcher，每个 computed watcher 会持有一个 Dep 实例，当我们访问 `computed` 属性的时候，会调用 computed watcher 的 `evaluate` 方法，这时候会触发其持有的 `depend` 方法用于收集依赖，同时也会收集到正在计算的 watcher，然后把它计算的 watcher 作为 Dep 的 Subscriber 订阅者收集起来，收集起来的作用就是当计算属性所依赖的值发生变化以后，会触发 computed watcher 重新计算，如果重新计算过程中计算结果变了也会调用 dep 的 notify 方法，然后通知订阅 computed 的订阅者触发相关的更新。

对于 `watch` 而言，会创建一个 user watcher，可以理解为用户的 watcher，也就是用户自定义的一些 watch，它可以观察 `data` 的变化，也可以观察 `computed` 的变化。当这些数据发生变化以后，我们创建的这个 watcher 去观察某个数据或计算属性，让他们发生变化就会通知这个 Dep 然后调用这个 Dep 去遍历所有 user watchers，然后调用它们的 `update` 方法，然后求值发生新旧值变化就会触发 run 执行用户定义的回调函数（user callback）。

:::

## Diff 算法

Vue 的 `Diff` 算法是一种**高效的更新虚拟 `DOM` 树的算法**。它顾名思义，主要是用于比较新旧虚拟 `DOM` 树，找出差异，然后只更新差异部分。`Diff` 的主要流程可以概括为几个部分。

### `patch` 函数

首先，当数据发生改变时，对应属性或对象的 `setter`（可能是由 `Object.defineProperty` 或 `Proxy` 实现）会调用 `Dep.notify()` 通知所有订阅者 `Watcher`，订阅者（们）就会**调用 `patch` 函数**给真实的 `DOM` 打补丁，更新相应的视图，实现响应式。

::: tip 数据发生改变的时机

当数据发生变化，`Vue` 将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。这样可以避免多次更新视图，提高性能。

当然，也可以通过 `Vue.nextTick` 来手动触发更新。

:::

**`patch` 函数主要参数即 `oldVnode` 和 `Vnode`**，代表前后的虚拟 `DOM` 节点。这一函数主要是对传入的两个节点**进行基本的比较**，并对**节点本身进行增删改**操作。

这一步主要做了这些事情：

1. 如果 `oldVnode` 不存在，说明是**初始化**，直接调用 `createElm` 函数创建新的 `DOM` 节点。
2. 如果 `Vnode` 不存在，说明是**删除节点**，直接触发旧节点的 `destroy` 钩子。
3. 调用 `sameVnode` 函数判断两个节点是否相同：
    - 如果不同，直接删除旧节点，创建新节点。
    - **如果相同，调用 `patchVnode` 函数，更新节点。**

### `patchVnode` 函数

这一函数同样会接受 `oldVnode` 和 `Vnode` 参数。这一函数主要是对**节点的属性**以及**子节点**进行基本比较，然后进行相应的更新，可能的话会借助 `updateChildren` 函数来对子节点进行更新。

1. 如果新旧节点都是静态的，直接返回。
2. 如果新节点是文本节点，且和旧节点不同，直接更新文本内容。
3. **如果新旧节点都有子节点，且不同，调用 `updateChildren` 函数更新子节点。**
4. 否则：
    - 如果新节点有子节点，旧节点没有，直接添加子节点。
    - 如果旧节点有子节点，新节点没有，直接删除子节点。
    - 如果新旧节点都没有子节点，直接更新属性。

### `updateChildren` 函数

这一函数是 `Diff` 算法的**重点**，主要任务是比对新老节点的子节点，尽量复用 `oldVnode` 的子节点，减少 `DOM` 操作。

大致的流程如下：

1. **初始化**：初始化 `oldStartIdx`、`oldEndIdx`、`newStartIdx`、`newEndIdx`，分别代表新旧节点的开始和结束索引（四个指针）。
2. 比较新旧索引的首首、尾尾节点，如果相同，直接更新节点 `patchVnode`。首/尾指针相应地向中间移动。
3. 比较新旧索引的首尾、尾首节点，如果相同，先更新节点 `patchVnode`，然后将更新后的节点移到新位置（否则子元素的相对位置还是原来的）。首/尾指针相应地向中间移动。
4. 如果以上都不满足，进入**特殊情况**。特殊情况我们会考虑在 `oldStartIdx` 和 `oldEndIdx` 之间的旧节点是否有与 `newStartIdx` 指向的这一节点相同的。这一查找过程可以通过**哈希表**来实现，将旧节点的 `key` 作为哈希表的 `key`，旧节点的索引设置为 `index`。
     - 如果有的话，我们会：调用 `patchVnode` 更新节点；删除旧节点，防止之后重复寻找；然后将更新后的节点移到相应的新位置。
     - 否则，直接在 `newStartIdx` 位置调用 `createElm` 创建新节点。
   这之后，`newStartIdx` 指针向后移动。
5. 跳转到 `2` 反复执行，直到新节点或旧节点指针相遇。
6. **收尾**：如果新旧节点有一个指针先到达终点，那么就说明新旧节点的子节点有增加或者删除，直接添加或者删除节点即可。

::: tip 题外话

如果没有设置 `key`，那么在第四步那里，会因为找不到 `key` 而直接创建新节点，这样会导致**大量的 `DOM` 操作**，性能会大打折扣。

:::

## Keep-Alive 实现

`keep-alive` 是 `vue` 中的内置组件，能在**组件切换过程中将状态保留在内存中**，防止重复渲染 `DOM`，提高性能。基本用法如下：

```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

其中还可以用 `include` 和 `exclude` 属性来通过组件的 `name` 指定哪些组件需要缓存，哪些不需要缓存。需要缓存的组件会多出来一个 `keep-alive` 的生命周期钩子函数 `activated` 和 `deactivated`。

`keep-alive` 这一组件中有一个属性 `cache`，它是一个 `Map` 对象，用于保存缓存的组件。还有一个属性 `keys`，它是一个数组，用于实现 **LRU（Least Recently Used）** 算法。

`keep-alive` 的强大缓存功能**是在它的 `render` 函数中实现**。这一函数主要做了以下事情：

1. 获取 `slot` 中的第一个子节点，即 `component` 组件，然后获取它的名称，用于判断是否需要缓存。如果不需要缓存，直接返回；
2. 获取组件的 `key` 值，然后去 `this.cache` 对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存，把它移出再插回 `keys` 数组的最后，用于实现 **LRU**。然后返回缓存的组件；
3. 如果没有缓存，把它设置到 `cache` 中，并设置 `keys` 数组，然后返回。如果 `keys` 数组的长度超过了 `max`，则删除第一个元素。
4. 如果 `include` 或 `exclude` 发生了变化，或者组件的 `name` 发生了变化，或者组件被销毁，都会执行 `pruneCache` 或 `pruneCacheEntry`（只维护一条）方法，维护缓存。

缓存后，如果有**更新数据**的需求，可以通过 `activated` 或者 `beforeRouteEnter` 钩子函数来实现。

## 权限管理

前端权限管理主要有以下几种方式，各种方式之间可以相互配合。

需要注意的是，以下的方式只是对权限的一种**弱约束**，用户可以通过**改 `sessionStorage`**、**直接调接口**等绕过前端的权限控制，因此**必须在后端做鉴权**（也就是接口权限）。

### 接口权限

登录时获取 `token`，将 `token` 存入 `sessionStorage` 等，利用 `axios` 的拦截器在每个请求前带上 `token`。后端利用 `jwt` 进行鉴权，如果未通过的话一般会返回 `401` 或者自定义代码，这时前端应当跳转到登录界面进行重新登录。

```js
axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
})
axios.interceptors.response.use((res)=>{
    if (response.data.code === 40099 || response.data.code === 40098) { 
      	// token 过期或者错误
        router.push('/login')
    }
})
```

### 路由权限

路由级别的权限控制主要有两种方式：**初始化挂载全部路由**与**登录时按需挂载**。

**初始化挂载全部路由**方式初始化时挂载全部路由，当用户登录时获取权限信息，在每次路由跳转的时候在路由守卫中判断用户权限与路由表中目标页面的权限是否匹配。

**登录时按需挂载**方式，初始化只挂载必要的页面如登录页和 `404` 页，当用户登录时获取权限信息后根据权限信息查路由表，过滤出所有可达的页面，然后挂载。这样每次路由跳转的时候就不需要判断（如果权限动态改变的话还是要判断）。

### 按钮权限

按钮权限主要思路即通过比较 `sessionStorage`  的 **`userRole` 数组（登录时从后端获取）**以及相应按钮的**使用权限数组 `btnPermissionsArr`**（如果没有定义的话可以使用路由中定义的页面权限）进行比较，如果不通过的话可以直接将该按钮从虚拟 `DOM-Tree` 中移除，从而达到了权限的控制。

主要的实现方式有两类：**使用 `v-if`** 和**使用 `Vue.directive` 自定义 `vue` 指令**。

```js
import Vue from 'vue'

const has = Vue.directive('has', {
    bind: function (el, binding, vnode) {
        // 获取页面按钮权限
        let btnPermissionsArr = [];
        if(binding.value){
            // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
            btnPermissionsArr = Array.of(binding.value);
        }else{
            // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
            btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
        }
        if (!Vue.prototype.$_has(btnPermissionsArr)) {
            el.parentNode.removeChild(el);
        }
    }
});

Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1) {
        isExist = true;
    }
    return isExist;
};
export {has}
```