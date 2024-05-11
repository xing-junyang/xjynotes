# 中间代码生成 LLVM IR
## LLVM IR简介

是一种**带类型**的**中间表示**（Intermediate Representation），介于**高级程序设计语言**和**汇编语言**之间。

::: details LLVM 名称来源
The name LLVM originally stood for **Low Level Virtual Machine**, though the project has expanded and the name is no longer officially an initialism.
:::

## 基本语句的表示

### 顺序语句（函数调用）

`C` 代码

```c
int factorial(int val);

int main(int argc, char **argv){
	return factorial(2)*7 == 42;
}
```

使用下面的指令生成 `llvm` 中间代码

```shell
clang -S -emit-llvm -fno-discard-value-names main.c -o f0-opt0.ll
```

其中 `-S` 表示了不生成 `bitcode`，而是生成可读的代码。生成的部分代码如下（平台为 `arm64-apple-macosx`，下同）。可以发现，这些代码的一部分有很明显的**汇编代码**的特征。

```txt
; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @main(i32 %argc, i8** %argv) #0 {
entry:
  %retval = alloca i32, align 4
  %argc.addr = alloca i32, align 4
  %argv.addr = alloca i8**, align 8
  store i32 0, i32* %retval, align 4
  store i32 %argc, i32* %argc.addr, align 4
  store i8** %argv, i8*** %argv.addr, align 8
  %call = call i32 @factorial(i32 2)
  %mul = mul nsw i32 %call, 7
  %cmp = icmp eq i32 %mul, 42
  %conv = zext i1 %cmp to i32
  ret i32 %conv
}

declare i32 @factorial(i32) #1
```

如果开启了 `O1` 优化，生成的代码如下

```txt
; Function Attrs: nounwind ssp uwtable
define i32 @main(i32 %0, i8** nocapture readnone %1) local_unnamed_addr #0 {
  %3 = call i32 @factorial(i32 2) #2
  %4 = icmp eq i32 %3, 6
  %5 = zext i1 %4 to i32
  ret i32 %5
}

declare i32 @factorial(i32) local_unnamed_addr #1
```



### 选择语句

#### 基本块与控制流图

每个**节点**定义一个**基本块**；**跳转**从一个节点开始，到一个节点结束，这二者就构成了控制流图。

基本块是LLVM中的一个重要概念，它用于表示程序中的基本控制流结构。基本块始于一个入口点并以一个分支指令或返回指令结束。**在基本块内部，不存在分支或跳转语句**。这种特性使得基本块成为了LLVM中进行各种优化的基本单元。

#### $Phi$ 指令

根据前序基本块来决定赋值。

例如下面的 `C` 代码

```c
int factorial(int val) {
    if (!val) {
        return 1;
    }
    return val * factorial(val - 1);
}
```

启用 $Phi$ 指令的 `LLVM IR` 部分代码（开启 `O1` 优化）如下

```txt 
; Function Attrs: nofree nosync nounwind readnone ssp uwtable
define i32 @factorial(i32 %0) local_unnamed_addr #0 {
  %2 = icmp eq i32 %0, 0
  br i1 %2, label %7, label %3

3:                                                ; preds = %1
  %4 = add nsw i32 %0, -1
  %5 = call i32 @factorial(i32 %4)
  %6 = mul nsw i32 %5, %0
  br label %7

7:                                                ; preds = %1, %3
  %8 = phi i32 [ %6, %3 ], [ 1, %1 ]	;这里启用了优化 // [!code warning]
  ret i32 %8
}
```

如果不开启优化，则不会使用 $Phi$ 指令，这一结构就与传统汇编相同（即 `SSA`，静态单赋值形式）。

```txt
; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @factorial(i32 %val) #0 {
entry:
  %retval = alloca i32, align 4
  %val.addr = alloca i32, align 4
  store i32 %val, i32* %val.addr, align 4
  %0 = load i32, i32* %val.addr, align 4
  %tobool = icmp ne i32 %0, 0
  br i1 %tobool, label %if.end, label %if.then

if.then:                                          ; preds = %entry
  store i32 1, i32* %retval, align 4
  br label %return

if.end:                                           ; preds = %entry
  %1 = load i32, i32* %val.addr, align 4
  %2 = load i32, i32* %val.addr, align 4
  %sub = sub nsw i32 %2, 1
  %call = call i32 @factorial(i32 %sub)
  %mul = mul nsw i32 %1, %call
  store i32 %mul, i32* %retval, align 4
  br label %return

return:                                           ; preds = %if.end, %if.then
  %3 = load i32, i32* %retval, align 4
  ret i32 %3
}
```

> 另可参阅 “The SSA Book” SSA-based Compiler Design
>
> [书籍下载链接](
> https://github.com/courses-at-nju-by-hfwei/compilers-resources/tree/master/books/Classic%20Textbooks)

### 循环语句

示例 `C` 代码如下

```C
int factorial(int val) {
    int tmp = 1;
    for (int i = 2; i <= val; i++) {
        tmp *= i;
    }
    return tmp;
}
```

开启一级优化，得到以下中间代码

```txt
; Function Attrs: nofree norecurse nosync nounwind readnone ssp uwtable
define i32 @factorial(i32 %0) local_unnamed_addr #0 {
  %2 = icmp slt i32 %0, 2
  br i1 %2, label %3, label %5

3:                                                ; preds = %5, %1// [!code warning]
  %4 = phi i32 [ 1, %1 ], [ %8, %5 ]// [!code warning]
  ret i32 %4

5:                                                ; preds = %1, %5// [!code warning]
  %6 = phi i32 [ %9, %5 ], [ 2, %1 ]// [!code warning]
  %7 = phi i32 [ %8, %5 ], [ 1, %1 ]// [!code warning]
  %8 = mul nsw i32 %6, %7
  %9 = add nuw i32 %6, 1
  %10 = icmp eq i32 %6, %0
  br i1 %10, label %3, label %5, !llvm.loop !10
}
```

其控制流图可被表示成下图

![控制流图](<Screen Shot 2024-04-26 at 3.48.29 PM.png>)

这一控制流大致的流程如下

**检查输入参数**

```txt
%2 = icmp slt i32 %0, 2
br i1 %2, label %3, label %5
```

首先，程序检查输入的参数是否小于 2。如果小于 2，则直接跳转到标签 `%3`，这意味着输入为 0 或 1。否则，继续执行计算阶乘的循环部分。

**处理输入小于 2 的情况**

```txt
3:
  ret i32 1
```

如果输入参数小于 2，则直接返回 1。因为阶乘的基本定义是 0 和 1 的阶乘都为 1。

**处理输入大于等于 2 的情况**

```txt
5:
  %6 = phi i32 [ %9, %5 ], [ 2, %1 ]
  %7 = phi i32 [ %8, %5 ], [ 1, %1 ]
  %8 = mul nsw i32 %6, %7
  %9 = add nuw i32 %6, 1
  %10 = icmp eq i32 %6, %0
  br i1 %10, label %3, label %5, !llvm.loop !10
```

这部分是处理输入参数大于等于 2 的情况。它使用循环来计算阶乘。

- `%6` 和 `%7` 是通过 `phi` 指令选择上一个基本块的结果，用于迭代阶乘的计算。
- `%8` 是将 `%6` 与 `%7` 相乘得到的结果，即当前迭代的阶乘值。
- `%9` 是将循环变量 `%6` 加 1 的结果，用于下一次迭代。
- `%10` 是检查是否已经计算到输入参数对应的阶乘值。如果是，则跳转到标签 `%3` 返回结果，否则继续循环执行计算。

## 使用控制台命令生成 LLVM IR 流程图

- 使用 `opt -dot-cfg <ll file>` 来生成 `DOT` 文件
- 使用 `Graphviz` 提供的工具 `dot` 来生成具有可读性的 `PDF` 文件

# 表达式的翻译

## 表达式的中间代码翻译

符号的综合属性 $addr$ 代表某节点的变量名、常量等；综合属性 $code$ 代表某节点已经生成的中间代码。

主要的产生式如下所示。其中 $S$ 代表赋值语句，$E$ 代表表达式。

![主要的产生式](<Screen Shot 2024-05-10 at 3.48.25 PM.png>)

利用这些产生式，我们构建语法树后，还要为语法树中的节点属性赋值。这些属性包括 $addr$ 和 $code$。

## 数组引用的中间代码翻译

### GEP 指令

即 `getelementptr` 指令，这是其[官方文档](https://llvm.org/docs/LangRef.html#getelementptr-instruction)。它的作用是获取某个子元素的地址，并且**不访问内存，只进行计算**。

# 控制流语句的翻译 

## 分工与合作

例如对 $\mathbf{if}~(B)~S_1$ 这类语句，我们需要考虑如何分配 $B.code$ 和 $S_1.code$ 的内容，即确定他们的**分工**；我们还要考虑 $\mathbf{if}$ 这一节点如何根据 $B.code$ 和 $S_1.code$ 生成自己的 $\mathbf{if}.code$，即确定他们的**合作**。

::: details 如果用 Antlr 访问语法树来生成 LLVM IR...
使用 `Visitor` 模式，就可以及时输出生成的代码，避免很多字符串拼接引起的性能问题。
:::

## if 条件语句的翻译

`if` 条件语句就是 $\mathbf{if}~(B)~S_1~\mathbf{else}~S_2$ 这类语句。如上文所述，这两种情况需要构建 $B.code$ 和 $S.code$ 两个中间代码，即**条件语句的翻译**和**分支代码块的翻译**。然后，我们要通过这两者来构建整个 `if` 条件语句的翻译。

### 翻译条件语句

对于每一个条件相关运算符，为其**生成一个临时变量来保存**即可。例如，可以为下面的代码生成如下的中间代码

::: code-group

```c [条件语句]****
true && false || a > b
```

```[生成的中间代码]
t1 = AND true false
t2 = icmp sgt a b
t3 = OR t1 t2
```

:::

::: tip 短路求值 
<!-- TODO -->
:::

### 翻译分支代码块

只需依次生成 $S_1.code$ 和 $S_2.code$ 即可。如果在使用 `Visitor` 模式，我们直接 `Visit` 这两个分支代码块即可。

### 整合两者

我们利用 `br` 语句来进行跳转，它的具体语法如下

::: tip `br` 语句的语法

可以实现根据条件跳转，也可以实现无条件跳转。
```
;有条件跳转
br <bool_stmt> <label1> <label2>

```
若`bool_stmt`为真，则跳转至`label1`；否则跳转至`label2`。

```
;无条件跳转
br <label1>
```
直接跳转至 `label`。
:::

然后我们开始构建控制流。对于 $\mathbf{if}~(B)~S_1~\mathbf{else}~S_2$ 这类语句，我们的中间代码结构大致如下

```
<B.code>
br <B.code.final_bool_tmp_var> <label1> <label2>// [!code warning]
<label1>:
<S1.code> ----> 这里是 if 语句的第一个分支 // [!code warning]
br <label3>  --> 在此处跳转，否则会执行第二个分支 // [!code error]
<label2>:
<S2.code> ----> 这里是 if 语句的第二个分支 // [!code warning]
<label3>: ----> 这里是整个 if 语句的结束，后接之后产生的代码 // [!code warning]
```

例如，对于以下代码，我们可以生成如下的中间代码

::: code-group
```c [if 语句]****
if (true && false || a > b) {
	a = b;
} else {
	b = a;
}
```

```[生成的中间代码]
t1 = AND true false
t2 = icmp sgt a b
t3 = OR t1 t2
br t3 label1 label2
label1:
a = b
br label3
label2:
b = a
label3:
```

```[B.code]****
t1 = AND true false
t2 = icmp sgt a b
t3 = OR t1 t2
```

```[S1.code]****
a = b
```

```[S2.code]****
b = a
```
:::

如果 `label` 已经在之前被使用过，那么我们需要为其生成一个**新的** `label`。否则在处理 `if` 语句的嵌套时，会出现问题。

## while 语句的翻译

`while` 循环语句就是$\mathbf{while}~(B)~S$ 这类语句。`while` 语句的翻译与 `if` 语句的翻译类似，只是控制流略有差异。因此，我们直接开始构建控制流，而不再重复条件语句的翻译和分支代码块的翻译（**这一部分是相同的**）。对于$\mathbf{while}~(B)~S$ 这类语句，我们的中间代码结构大致如下

```
<label1>:
<B.code>
br <B.code.final_bool_tmp_var> <label2> <label3>
<label2>:
<S.code> ----> 这里是 while 语句的循环体 // [!code warning]
br <label1>  --> 在此处跳转，进行下一次循环，否则会执行下一条指令 // [!code error]
<label3>: ----> 这里是整个 while 语句的结束，后接之后产生的代码 // [!code warning]
```

### break 和 continue 语句的翻译

每次进入 `while` 循环时，储存 `label1` 和 `label3`；然后每当在循环体内遇见 `break` 或 `continue` 时，分别生成跳转到 `label3` 和 `label1` 的无条件跳转语句即可。可以使用一个栈来存储这些 `label`。

