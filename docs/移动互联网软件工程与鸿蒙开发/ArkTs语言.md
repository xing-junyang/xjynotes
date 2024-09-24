# ArkTS 语言介绍

## 历史

- 最早，Mozilla 创造了 **JavaScript** 语言。最初主要是为了解决页面的逻辑交互问题。为了提高应用的开发效率，相应的 JavaScript 前端框架也不断地清理出来，逐渐形成了一套完整的响应式前端开发框架，如 **React、Vue** 等。
- **TypeScript** 是 Microsoft 开发的一种编程语言，是 JavaScript 的超集，支持 JavaScript 的所有语法。TypeScript 在 JavaScript 的基础上增加了类型系统，可以在编译时检查类型错误，提高代码的可维护性和可读性。
- **ArkTS** 是基于 TypeScript 的，**HarmonyOS** 优选的主力应用开发语言。当前，ArkTS 主要扩展了声明式前端开发的功能。

## ArkTS 语言特性

### 基础语法

可以使用下面的声明来定义并初始化变量：

- `let` 声明：语法为 `let <变量名> (: <类型>) = <值>`，该变量在程序执行期间可以有不同的值。类型既可以指定，有时也可以省略以进行自动推断。
- `const` 声明：`const <变量名> (: <类型>) = <值>`，该变量在被指定值后不可以被改变。

变量的基本类型有以下几种：

- `Number`：整数和浮点数。对于整数，可以使用如 `0x` 等标志来进行自动**进制转换**；对于浮点数，可以使用**科学记数法**表示，如 `1e9`。

- `Boolean`：由 `true` 和 `false` 两个逻辑值组成。 

- `String`：代表字符序列，可以使用转义字符来表示字符。另外可以使用反向单括号括起来的模板字面量，如 `The result is ${a}`，其中 `a` 是一个字符变量。

- `Void` ：用于指定函数没有返回值。

- `Object` ：所有引用类型的基类型。

- `Array` ：由可赋值给数组声明中指定的类型的数据组成的对象。

- `Enum` ：枚举类型，是预先定义的一组命名值的值类型。 

- `Union` ：联合类型，可以组合多个类型。如

  ```typescript
  class Cat { sleep () {}; meow () {} } 
  class Dog { sleep () {}; bark () {} } 
  class Frog { sleep () {}; leap () {} }
  
  type Animal = Cat | Dog | Frog | number
  let animal: Animal = new Frog();
  ```

- `Aliases` ：为匿名类型（数组、函数、对象字面量或联合类型）提供名称。例如

  ```typescript
  type Matrix = number[][];
  type Handler = (s: string, no: number) => string; 
  type Predicate <T> = (x: T) => Boolean;
  type NullableObject = Object | null;
  ```

运算符基本与 `C` 相同，有一些特殊的运算符如下：

- `a >> b` 为算术右移，`a >>> b` 为逻辑右移；

其余的赋值、`if/else` 语句、`while/for` 语句都与 `C` 相同，不再赘述。有一些特殊的语法糖，如

- `for of` 语句：语法为 `for(<forVar> of <expression>){ <statements> }`。

### 方法

函数的基本语法如下：

```typescript
function <func_name> (<param>:<param_type>...): <return_val_type> {
  <statements>
}
```

除此之外，还有一些特殊的函数声明：

- 可选参数：`<param>?:<param_type>`，在调用的时候可以省略这个参数。
- 默认参数：`<param>:<param_type> = <value>`，在调用的时候可以省略这个参数，用默认值代替。
- `Rest` 参数：`...<param>:<param_type> = <value>`，在调用的时候把多余的参数吸收到这个数组中。这一个参数的类型必须是数组类。
- 缺省返回值类型：有些返回值的类型可以自行推断。

此外，还有一类箭头函数（即 Lambda 函数）用于简易的逻辑，如

```typescript
let sum = (x: number, y: number): number => {
    return x + y;
}

let sum1 = (x: number, y: number) => { // [!code warning] // 可以省略可推断出来的返回值类型
    return x + y;
}

let sum1 = (x: number, y: number) => x + y  // [!code warning] //单表达式还可以省略括号和 return
```

函数还可以作为返回值被返回。此时，由于**闭包**的语言特性，新创建的函数在外层仍维持了对它的环境的引用。例如下面的代码：

```typescript
function f(): () => number { 
    let count = 0;
    let g = (): number => { count++; return count; };
    return g; // [!code warning] // 函数作为返回值
}

let z = f();
z();  // 返回 1
z();  // 返回 2
```

可以看出，`z()` 仍然保留了 `f()` 作用域下的 `count`，这就是闭包。闭包在状态保持、函数工厂、事件处理等场景中非常有用。

函数还可以进行**重载**。具体的做法是：为同一个函数写入多个同名但签名不同的函数头，函数实现紧随其后。**注意：不允许重载函数有相同的名字以及参数列表**。

```typescript
function foo(x: number): void;
function foo(x: string): void;
function foo(x: number | string):void {
    // 在此处实现函数
}

foo(123456);  // number, OK
foo('abc');   // string, OK 
```

### 类和接口

类声明引入一个新类型，并定义其**字段、方法和构造函数**。下面是一个简单的类的例子：

```typescript
class Test {
  private first_name: string = '';
  private last_name: string = '';

  constructor(first_name: string, last_name: string) {  // 构造函数
    this.first_name = first_name;
    this.last_name = last_name;
  }

  set firstName(first_name: string) {   //built-in setter
      this.first_name = first_name;
  }

  set lastName(last_name: string) {
      if(last_name.match("[0-9]")){
          throw Error("No digits allowed in last name!") // [!code error]
      }
      this.last_name = last_name;
  }

  get fullName() {    //built-in getter
    return this.last_name + this.first_name;
  }

  calculateNameLength(): number{
      return this.first_name.length + this.last_name.length;
  }
}
```

字段相当于类的成员变量，声明的语法为 `<name>: <type> = <expr>`。默认为**实例字段**，即独立存在于类的每一个实例中；在 `<name>` 前加一个 `static` 转换为**静态字段**，即可让该类的所有实例共享。需要注意的是，ArkTS 要求所有字段在声明时或者构造函数中**显式初始化**。

类中的方法与普通函数相同，只是不需要写 `function` 关键字。构造函数的方法名为 `constructor`，它用于初始化对象状态，如果未定义构造函数，则会自动创建具有空参数列
表的默认构造函数。ArkTS 还提供了现成的 `Getter` 和 `Setter` 函数，只需在函数名前加 `get` 和 `set` 即可提供对对象属性的受控访问。例如，上文代码可以实现对姓的合法性校验，在运行下面的代码时就可以抛出异常。

```typescript
let test = new Test("HL", "PT");
test.firstName = '123'; // First name, Uh...OK.
test.lastName = '123';  // Last name, THROW ERROR! // [!code error]
```

一个类可以继承**一个**类作为父类，还可以实现**多个**接口。其语法如下：

```typescript
class [extends BaseClassName] [implements listOfInterfaces] {
    // ...
}
```

继承类继承父类的字段和方法，**但不继承构造函数**。继承类可以新增定义字段和方法，也可以覆盖其父类定义的方法。子类可以重写其父类中定义的方法的实现。**重写的方法必须具有与原始方法相同的参数类型和相同或派生的返回类型**。关键字 `super` 可用于访问父类的实例字段、实例方法和构造函数。在实现子类功能时，可以通过这个关键字从父类中获取所需接口。另外，利用可见性修饰符可以控制类中方法和字段在其他类中的可见性，这一定义与大部分 OOP 语言相同。

接口声明包含属性和方法的声明，并引入新类型。接口是定义代码协定的常⻅方式。实现接口的类必须把接口中定义的所有方法列出，除了有默认实现定义的方法。

类和接口的定义还可以使用**泛型**，将类型作为参数添加到定义之中。编译器在使用泛型类型和函数时会确保类型安全。

```typescript
class CustomStack<Element = number> { // Default type is number
    public push(e: Element):void {
        // ... 
    }
}

let s = new CustomStack<string>();
let t = new CustomStack();
s.push(55); // Compile Error!
t.push(55); // OK
```

### 空安全

ArkTS 使用了严格空值检查模式，具体来说，需要满足下面的规则：

- 可以为空值的变量必须定义为联合类型 `T | null`；
- 不为空值的变量用 `!` 后缀来断言，如 `a!`；这一操作符作用于空值会报错，否则，类型将从 `T | null` 更改为 `T`。有些运算操作数的类型不可为可空值，这时就要使用 `!` 后缀；
- 空值合并二元运算符 `??` 用于检查左侧表达式的求值是否为空值，如果是，则表达式的结果为右侧表达式，否则，结果为左侧表达式。即 `a ?? b` 与 `a == null ? b : a` 等价。

### 模块

程序可划分为多组编译单元或模块。可以使用关键字 `export` 导出顶层的声明，如果通过 `export` 方式导出，在导入时要加 `{}`。

导入声明用于导入从其他模块导出的实体，并在当前模块中提供其绑定。一般导入有两种范式：

::: code-group
```typescript [全部导入]
import * as Utils from './utils'
Utils.X
Utils.Y
//可能会导入过多无需使用的模块，导致编译后的HAP包太大，占用过多资源，请谨慎使用。
```
```typescript [部分导入]
import {X, Y} from './utils'
X
Y
```
```typescript [部分导入再命名]
import {X, Y as Z} from './utils'
X
Z
```
:::

### 容器类库

容器类采用了类似静态语言的方式来实现，并通过对存储位置以及属性的限制，让每种类型的数据都能在完成自身功能的基础上去除冗余逻辑，保证了数据的高效访问，提升了应用的性能。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src='/image/Screen Shot 2024-09-24 at 4.49.01 PM.png' alt="" style="width:80%;"></img>
    <p style="font-size: 12px; color: gray;">ArkTS语言基础类库能力示意图</p>
</div>

具体的用法可以前往 ArkTS 官网查看[容器类库概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/container-overview-V5)。

# ArkCompiler 编译器