# JavaScript Object 方法

ECMAScript 6 中的 `Object` 类提供了一系列方便的方法，用于对对象进行操作。本文将对这些方法进行分类介绍。

## 属性转数组类

属性转数组类的方法主要有三种：`keys(obj)`、`values(obj)` 以及 `entries(obj)`。它们都接受一个对象作为**参数**，然后返回一个**数组**。返回的数组内容为：

| 方法                    | 返回值                                                  |
|-----------------------|------------------------------------------------------|
| `Object.keys(obj)`    | [key1, key2, ...]，其中为对象内的**属性名**                     |
| `Object.values(obj)`  | [value1, value2, ...]，其中为对象内的**属性值**                 |
| `Object.entries(obj)` | [[key1, value1], [key2, value2], ...]，相当为将对象**拉成数组** |

可以自己实现一个 `Object.entries`

```js
function myObjectEntries(obj) {
    let arr = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {//确定属性不是从原型链上得到的
            arr.push([key, obj[key]]);
        }
    }
    return arr;
}
```

## 冻结对象类

冻结对象类主要有两种 `Object.freeze(obj)` 和 `Object.seal(obj)`。`freeze` **不允许对对象的属性进行添加或删除，同时也不能更改属性**；`seal` 则是**只不允许对对象属性进行增删**，但是**可以修改现有属性**。如果希望**只锁定某个属性**，可以使用 `Object.defineProperty`。

如果对属性进行修改，执行时并**不会报错**，**只是不起作用**而已。但是如果**增删属性，执行时会报错**。

**如果对象中某个属性实际上还是一个对象（引用类型属性），那么对这个对象内部的修改是允许的（会产生效果）。**如果希望完全锁住对象，应当**递归调用**。（有点像默认为浅拷贝，需要自己手写深拷贝）

## 读写属性类

对对象内属性进行读写的操作主要有三种：`Object.hasOwnProperty()`、`Object.defineProperty()` 以及 `Object.defineProperties()`。

`a.hasOwnProperty(str)` 用于检查对象 `a` 是否含有名称为 `str` 的属性，返回**布尔值**。这一检查是**不考虑原型链**且**不关心为引用类型属性中的属性**。

`Object.defineProperty(obj, 'a', {value: 1, writable: false})` 将为对象 `obj` 增加一个名为 `a` 的属性，其值为 `1`。

- 可以设置 `writable: false` 来**禁止对这一属性**进行更改。（显然，这一禁止也是没办法对为引用类型属性中的属性进行限制的）
- 可以设置 `enumerable: true` 来使这一属性**可枚举**。（例如，不设置的话， `for(let key in obj) `或者 `console.log(obj)` 时不会出现这个属性。）
- 可以设置 `configurable: false` 来**禁止删除这一属性**。（但是可以对这一属性进行修改）
- 可以设置 `get` 和 `set` 来定义**属性的读写行为**。**`Vue 2` 就是这样实现响应式的**。例如
    
```js
let obj = {
    a: 1,
    b: 2
}
Object.defineProperty(obj, 'c', {
    get: function() {
        return this.a + this.b;
    },
    set: function(value) {
        this.a = value;
        this.b = value;
    }
})
console.log(obj.c); // 3
obj.c = 3;
console.log(obj.c); // 6
```

> [!NOTE] 可枚举
> 
> 可枚举是对象中属性的一种特性，如果属性是可枚举的，那么它会出现在 `for...in` 循环中，也会出现在 `Object.keys()` 之类的属性转数组方法的返回值中。**默认情况下，通过 `Object.defineProperty()` 添加的属性是不可枚举的。**

可以使用 `Object.defineProperties` 来一次性定义多个属性。（注意，这个方法比 `Object.defineProperty` **少了一个参数**，因为**多个属性直接又封成了一个对象**）

```js
Object.defineProperties(obj, {
  a: { value: 1, writable: false },
  b: { value: 2, writable: true }
})
```

## 原型类

涉及原型操作的主要有三种：`Object.create()` 、`Object.getPrototypeOf()` 和 `Object.setPrototypeOf()`。

`Object.create(proto)` 返回一个**新对象**，这一对象的原型对象为 `proto`。这一方法还可以接受**第二个参数** `propertiesObject`，用于定义新对象的属性。(类似于 `Object.defineProperties` 中的第二个参数)。

> [!TIP] 小技巧
> 
> `Object.create(null)` 可以创建一个**没有原型链的对象**，这样的对象**不会继承任何属性**。很适合作为**哈希表**（字典）。

`Object.getPrototypeOf(obj)` 返回 `obj` 的原型对象，而 `Object.setPrototypeOf(obj, proto)` 可以将它的原型对象设置为 `proto`。

## 对象基本操作类

基本的对象操作包括创建和比较： `Object.fromEntries()` 、`Object.assign()` 和 `Object.is()`。

`Object.fromEntries(entries)` 可以将 `entries` 数组转换为对象。这一数组的格式和 `Object.entries(obj)` 的返回值的格式是一样的。

```js
// 思考： // [!code focus]
Object.is(obj, Object.fromEntries(Object.entries(obj))) === true // 吗？ // [!code focus]
// 答案：不等于。因为 is 是比较引用，新生成的对象和原来的对象引用肯定不相同。

// 进一步思考：obj 和 Object.fromEntries(Object.entries(obj)) 的区别？ // [!code focus]
// 1. 如果属性不可枚举的话，生成的数组中将不含有。
// 2. 符号属性会在生成的数组中丢失。
// 2. 原型链的相关信息会丢失。
```

`Object.assign(target, source)` 可以将 `source` 中的属性和它的值“**原封不动**”（会有一些变化）地挪到 `target` 中，并返回这个整合后的对象。

> [!WARNING] 一些变化
>
> 注意，如果这一属性是由 `defineProperty` 添加设置了 `writeable: false` 时，整合后的对象**不会含有这一约束**，即**只读属性会清除**。
> 
> 但是，如果设置了 `enumerable: true`，整合后的对象**也会含有这一约束**，即相应的属性**还是可枚举的**。
> 
> 此外，`Object.assign` 执行的也是**浅拷贝**。

`Object.is(target, source)` 可以比较两个对象是否相同。它**只检查两个对象是否是同一个引用，也不会比较原型链**。

> [!NOTE] Object.is 和 === 的差异
>
> `Object.is()` 和 `===` 在大多数情况下行为相同，但有以下区别：
>
> 1. `Object.is(NaN, NaN)` 返回 `true`，而 `NaN === NaN` 返回 `false`。
> 2. `Object.is(+0, -0)` 返回 `false`，而 `+0 === -0` 返回 `true`。