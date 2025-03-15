# JavaScript 原型链与继承

本文将介绍 JavaScript 中的原型链，并动手实现一个继承机制。

## 原型链

大多数面向对象的编程语言都有**类和继承**的概念，而 JavaScript 通过原型来实现了**这一机制**。我们已经熟悉 JavaScript 中的对象类型，那么能否将对象之间联系起来呢？

### 什么是原型链？

有些时候，我们希望对象之间可以共享属性和方法，否则每个对象都会有一份独立的属性和方法，这样既浪费内存，也不利于维护。这是 OOP 中**继承和复用**的基本需求。

JavaScript 中每个对象都有一个**隐藏的** `[[Prototype]]` 属性，它指向另一个对象（**原型对象**）。这一属性可以通过 **`.__proto__`** 或者 `Object.getPrototypeOf` 访问。

当访问对象的属性时，如果当前对象没有该属性，JavaScript 就会**自动**沿着原型链**向上查找**，直到找到该属性或到达原型链末端（`null`）。通过不断访问 `__proto__` 属性，就实现了向上查找这一过程。例如：

```javascript
const parent = { name: "Parent" };
const child = { age: 10 };

child.__proto__ = parent;

console.log(child.name); // 输出 "Parent"
```

很好，这样我们就将 `parent` 对象的属性和方法共享给了 `child` 对象。实际上，在 ECMAScript 6 中，我们可以**通过 `Object.create` 来创建一个对象，并指定其原型对象**：

```javascript
const parent = { name: "Parent" };
const child = Object.create(parent, { age: { value: 10 } });

console.log(child.name); // 输出 "Parent"
```

这与上面的例子是等价的。

::: warning 注意
虽然 `__proto__` 被大多数浏览器支持，但更推荐使用：

- `Object.getPrototypeOf(obj)`
- `Object.setPrototypeOf(obj, proto)`

另可参见 [JS 对象方法](./JS对象方法.md#原型类)
:::

但很快，我们就会发现问题：原型链都是通过**引用**来进行连接的，**如果我们修改了原型对象的属性，那么所有继承自它的对象都会受到影响。**究其原因，其实是我们实现的“继承”完全是在**对象（实例）层面上的**，而**不是在类（构造函数）层面上的**。

### 新建一个实例？

我们知道，JavaScript 的类是通过**构造函数**来实现的。构造函数是一种特殊的函数，通过 `new` 关键字来调用的函数都是构造函数。例如：

```javascript
function Person(name) {
  this.name = name;
}

const p = new Person("Tom");
console.log(p.name); // 输出 "Tom"

const p2 = new Person("Jerry");
console.log(p2.name); // 输出 "Jerry"
```

这样，我们就创建了两个实例对象 `p` 和 `p2`，它们都有自己的 `name` 属性（是的，这可能唤醒了你的 `C++/Java` 血脉）。我们可以看出，构造函数的一大作用就是**创建一个新的对象实例**。

那么，如何把构造函数和原型链的概念串起来呢？这样我们就可以向 OOP 迈进一步（例如，手搓一个真正的**继承**）了。这就需要介绍 `prototype` 了。

### `prototype` 和 `__proto__`

假设我们是 JavaScript 的设计者（或者 ECMA 委员会的老大），现在想把构造函数和原型链串起来，该怎么办呢？显然，我们首先就应该让**创建的对象和构造函数之间存在某种联系**。不然，我们连某个对象是由哪个构造函数创建的都不知道，就根本没办法调类方法，更别提继承了。（从上面那个例子也能看出来，要是 `p/p2` 跟构造函数没联系，哪来的 `name` 属性？`this` 又是神魔？）

那么，这是如何实现的呢？可以想到，**原型链**就是一个很好的产生联系的机制。

因此，JavaScript 中就采用 `prototype` 来实现这一机制。**每个函数**都有一个 `prototype` 属性，它指向一个叫做**原型对象**的**对象**。而每个被这个函数创造出来的对象的 `__proto__` 都指向这个原型对象。那么上面的例子里我们就有：

```javascript
console.log(p.__proto__ === Person.prototype); // 输出 true
```

这样不就把构造函数和它创建的对象联系起来了吗？还有一些**额外的收获**：因为 `prototype` 是一个对象，所以我们自然就可以在这个对象上定义一些属性（包括函数），这样所有由这个构造函数创建的对象都可以**共享这些属性和方法**；并且通过原型链自动向上查找，我们可以**直接**访问这些属性，就像是他们自己的一样。**类（甚至继承）的感觉有点出来了**，真好！😆

下面的表格总结了 `prototype` 和 `__proto__` 的区别：

|         | `prototype`    | `__proto__` |
|---------|----------------|-------------|
| **拥有者** | 函数对象           | 所有对象        |
| **作用**  | 函数构造出来的对象指向的原型 | 对象实际指向的原型   |


下面的图片可以帮助我们更好地理解这一机制：

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src="/image/m5DXc.png" alt="" style="width: 70%" />
    <p style="font-size: 12px; color: gray;">一个原型链的可视化</p>
</div>

::: tip 一些典型情况

- 所有对象的 `__proto__` 都指向 `Object.prototype`，这是因为所有对象都是由 `Object` 构造出来的。因此，所有原型对象（`.prototype`）的 `__proto__` 都指向 `Object.prototype`。
- 所有函数的 `__proto__` 都指向 `Function.prototype`，这是因为函数是被 `Function` 构造出来的。所以，`Function.__proto__` 也指向 `Function.prototype`。
- `Object.prototype` 的 `__proto__` 指向 `null`。这是唯一一个 `__proto__` 指向 `null` 的对象。

:::

你可能会问，道理我都懂，但是这个函数跟它构造出来的对象的原型链到底是**什么时候链起来的呢**，我咋没看到呢？回过头来看看，我们似乎一直都忽略了一个东西，就是 `new` 运算符。那么答案已经呼之欲出了，下面我们就来看看 `new` 运算符到底帮我们干了啥。

### `new` 运算符

**当我们在谈论 `new` 运算符时，我们在谈论什么**？读完刚才的内容，你隐约觉得 `new` 运算符**不光是用来创建新对象的**。那么，这一部分我们就来好好看看 `new` 运算符到底做了什么。

我们再来看这一个例子：

```javascript
function Person(name) {
  this.name = name;
}

const p = new Person("Tom");
console.log(p.name); // 输出 "Tom"

console.log(p.__proto__ === Person.prototype); // 输出 true
```

分析一下，我们可以把 `new` 抽象成一个**函数**：它接受**一个构造函数 `f`** （这里的 `Person`）和**一些参数 `args`**（`Tom`)，然后**返回一个新对象 `obj`**（`p`）。这个对象的 `__proto__` 指向 `f.prototype`。并且，**`f` 会被调用**（不然对象哪来的属性？），调用的过程中，函数里的 `this` 指代这个新对象 `obj`。

经过分析，我们可以把这些步骤总结成以下几点：

1. **新建对象**：创建一个新的空对象；
2. **原型链**：将新对象的 `__proto__` 指向 `f` 的 `prototype`；
3. **调用**：执行 `f`，绑定构造函数的 this 到新对象，并传入参数；
4. **返回**：返回新对象（**或者构造函数的返回值，下面有说明**）。

这里有一个小小的**语言特性**：**当构造函数的返回值是一个对象时，`new` 运算符返回这个对象，而不是新建的对象，如果是基本类型则忽略**。这样，我们就可以实现一些 Singleton or something...

也就是说：

```javascript
function Person(name) {
  this.name = name;
  return { name: "Jerry" };
}

const p = new Person("Tom");
console.log(p.name); // 输出 "Jerry"
```

那么，根据这一步骤，我们就可以自己手写一个 `new` 函数啦。下面是一个简单的实现：

```javascript
// 请思考后，在把鼠标移动到下面的代码块查看 // [!code focus]
function myNew(f, ...args) {
    const newObj = Object.create(f.prototype);
    const res = f.apply(newObj, args);
    return res instanceof Object ? res : newObj;
}

```

## 继承

明白了上面的原理之后，我们可以着手来设计一个**继承**的机制，来完善我们的 `OOP`。继承一般需要解决两个问题：一方面是**子类可以直接继承父类的属性和方法**，另一方面是**子类可以自定义自己的属性和方法**。我们需要尽可能往这两个目标努力。

### 原型链继承

刚刚我们在讲 `prototype` 的时候，我们提到，**原型对象**可以保存一些属性和方法，这些属性和方法可以被所有由这个构造函数创建的对象共享。这里是不是就有一些**继承**的意味了呢？我直接把子类构造函数的 `prototype` 指向父类的一个对象当作子类的原型对象，这样不就实现了继承了吗？就像下面这样：

```javascript
function Parent(name) {
    this.name = name;
}

function Child(age) {
    this.age = age;
}

Child.prototype = new Parent('Father'); // 直接 new 一个父类对象，作为子类构造函数的原型对象 // [!code warning]
const child = new Child(12);
console.log(child.name); // "Father"
```

看起来不错嘛。恭喜你发明了**原型链继承**！🎉

但仔细想想，不对啊，我们刚刚是不是**又混淆了父类（构造函数）和父类对象（实例）这两个概念**？我们希望的是**子类继承父类**，而不是**继承父类的某个实例**。要不然，我们的所有子类实例都会**共享一个父类实例**，这显然不是我们想要的。比如说

```javascript
const child1 = new Child(14);
console.log(child1.name); // "Father"
```

那我如果修改了 `child1.name`，看：

```javascript
child1.name = "Mother";
console.log(child1.name); // "Mother"
console.log(child.name); // "Father"
```

诶？怎么 `child` 的 `name` 属性**没变**呢？他们不是都指向同一个 `Parent` 实例吗？从原型链找上去，不应该找到的是同一个 `name` 嘛？好问题！这涉及到刚才一个我们没有讨论到的问题：**属性访问优先级**。

::: tip 属性访问优先级

刚才我们说过，当访问对象的属性时，如果自身没有这一属性，JavaScript 会**自动沿着原型链向上查找**，直到找到该属性或到达原型链末端（`null`）。这是在**读取**属性时的情况。

在修改属性时，会有一些差别。当我们创建（或者修改，下同）对象的属性时，JavaScript 尽可能**在对象自身上创建这一属性**，除非**涉及引用类型**。也就是说，如果我们修改了 `child1.name`，JavaScript 会**优先**在 `child1` 上创建一个 `name` 属性（**本来就可以这样做，不是吗？**），而不会去修改原型链上的 `name` 属性。但是，如果我们修改的是引用类型的属性，例如，要修改 `child1.school.name`，那么 JavaScript 就要**先找到 `school` 属性**，然后再在 `school` 上创建 `name` 属性。在找 `school` 的过程中，如果 `child1` 上没有，才会去原型链上找。

:::

了解了这些，我们就能回答之前的疑惑。但随之而来的是发现**原型链继承**有一个很大的问题：**当父类有引用类型的属性时，所有子类实例都会共享这一属性**。但如果父类没有引用类型的属性，那么这种继承方式就可还行。真的是大起大落！

> [!NOTE] 原型链继承的其他问题
> 
> 另一方面，原型链继承还有一个问题：**无法向父类构造函数传参**。因为我们是直接 new 一个父类对象，这个对象是定死的，无法传参。所以，还是不够完美啊... 🥱

### 构造函数继承

经历了上面的波折，我们发现，不能把父类的实例直接当作子类的原型对象，至少也**得每创建一个子类实例的时候都创一个新的父类实例**才像话。那么，我们是不是可以**在子类构造函数中调用父类构造函数**，然后把父类的构造函数和新创建的这个子类实例联系起来，让父类的构造函数帮着把它自己的属性挂到这个子类实例上呢？

经过思考，我们不难想到 `call` 或者 `apply` 这些东西，我**把 `this` 指向改一改**不就能四两拨千斤了嘛：

```javascript
function Parent(name) {
    this.name = name;
}

function Child(name, age) {
    Parent.call(this, name); // 改变 this 指向，让父类构造函数帮忙实例化 // [!code warning]
    this.age = age;
}

const child = new Child('Child', 12);
```

恭喜你又发明了构造函数继承！这一方法巧妙地改变了 `this` 的指向，让父类的构造函数帮助子类实例化，完美**解决了原型链继承的两个问题**。感觉针不戳 🤣

但聪明的你很快又发现，这玩意好像有个问题，**只能继承一层**：`child.__proto__` 指向的是 `Child.prototype`；然后 `Child.prototype` 也没动过，那默认就是 `Object` 直接构造出来的，它不是 `Parent` 搞出来的，所以 `child.__proto__.__proto__` 直接整到 `Object.prototype` 去了。这样**原型链不就断了嘛**，在往上推的时候根本找不到 `Parent`。更坏的是，**父类的原型方法也给干没了**。你就只能眼巴巴的这样定义共享函数：

```javascript
function Parent(name) {
    this.name = name;
    this.sayName = function() { // 只能这样定义共享函数了 // [!code warning]
        console.log(this.name);
    };
}
```

这样每个实例都会有一个自己的 `sayName` 函数，这不就又冗余了嘛。

### 组合继承（经典继承）

所谓见招拆招，既然原型链断了，那咱们给它接上不就行了嘛。既然构造函数继承只能继承一层，那咱们就**组合**一下，**既用构造函数继承，又用原型链继承**，这不就完美了吗？这就是**组合继承**的思想，且看：

```javascript
function Parent(name) {
    this.name = name;
}

Parent.prototype.sayHello = function() {
    console.log('Hello, ' + this.name);
}

function Child(name, age) {
    Parent.call(this, name); // 构造函数继承，第二次调用父类构造函数 // [!code warning]
    this.age = age;
}

Child.prototype = new Parent(); // 原型链继承，第一次调用父类构造函数 // [!code warning]
Child.prototype.constructor = Child; // 修正构造函数指向 // [!code warning]
const child = new Child('Child', 12);

console.log(child.name); // Child
console.log(child.age); // 12
child.sayHello(); // Hello, Child
```

第一次调用父类构造函数是**原型链继承**的思想，这一步可以事先随便构造一个父类实例，不重要，因为这一步的目标只是把子类的原型链挂上。第二次调用父类构造函数是利用了**构造函数继承**的思想，目标是让父类的属性放到子类实例上，这一步才是真正的实例化。这样，原型链继承和构造函数继承**各取所长**，既解决了原型链继承的问题，又解决了构造函数继承的问题。

至此，我们开头的两个问题都解决了，**组合继承**也基本实现了**继承**的功能。🥳

::: warning 注意修正构造函数指向

需要注意到上面的代码中第 `15` 行，那里我们将 `Child.prototype` 的 `constructor` 属性指向了 `Child`。这是在干嘛？

实际上，JavaScript 中有一个小规范，即每个函数的 `prototype` 对象都默认有一个 `constructor` 属性，**指向这个函数本身**。这一设定主要是因为某些库或代码可能依赖 `constructor` 属性**来创建相应的对象**或检查类型。由于我们的 `Child.prototype` 是一个由 `Parent` 创建的实例，所以如果我们调用 `Child.prototype.constructor`，实际上是指向 `Parent` 的（**想一想为什么，一定要想明白，这里有些绕**）。

因此，为了代码的**鲁棒性** 🤣，我们需要手动将 `constructor` 指向 `Child`，以保持一致。

:::

但是，如果你是“完美主义者”，可能会想，**父类的构造函数被调用了两次**，这不是浪费了吗？`JavaScript` 真就这么笨吗，我还是滚回去啃我的 `C++` 吧。别急，我们还有最后一个完美的继承方式：**寄生组合式继承**。

### 寄生组合式继承（最佳实践）

寄生组合式继承是**组合继承**的一种优化，它利用 [`Object.create()`](JS对象方法.md#原型类) 来实现**原型链继承**同时不调用父类的构造函数，从而**避免了两次调用父类构造函数**。它与组合继承的区别在于**不直接将父类实例赋给子类原型**，而是通过一个**中间对象** `prototype` 来实现。

```javascript
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype); // 这一步纯粹就是绑定原型链，不调用父类构造函数 // [!code warning]
  prototype.constructor = child;
  child.prototype = prototype;
}

function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}

inheritPrototype(Child, Parent);
```

至此，我们已经迭代出一个完美的继承方式，可喜可贺！🎉🌟

### 继承的最终结局

ES6 原生支持继承语法，使用 `class` 即可。

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name) {
    super(name);
  }
}
```
当然，`class` 和 `extends` 本质上是一种**语法糖**，其底层就是基于**寄生组合式继承**实现的。


## 本文小结

- 原型链是 JavaScript 实现面向对象的基础机制
- 理解 `prototype` 和 `__proto__` 的关系是关键
- 不同的继承方式有各自的优缺点，现代开发中建议使用 ES6 的 class 语法
- 掌握底层原理有助于更好地使用高级语法特性

**继承方式对比**：

| 继承方式    | 优点       | 缺点                           |
|---------|----------|------------------------------|
| 原型链继承   | 简单       | 引用类型共享问题，父类构造函数传参问题          |
| 构造函数继承  | 解决引用类型问题 | 原型链断裂，无法继承原型方法               |
| 组合继承    | 结合两者优点   | 父类被调用两次                      |
| 寄生组合式继承 | 最理想的继承方式 | 需要支持 `Object.create` 方法（ES5） |