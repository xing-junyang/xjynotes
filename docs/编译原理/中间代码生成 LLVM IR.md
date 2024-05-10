# 中间代码生成 LLVM IR
## LLVM IR简介

是一种**带类型**的**中间表示**（Intermediate Representation），介于**高级程序设计语言**和**汇编语言**之间。

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

```llvm
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

```llvm
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

每个节点定义一个基本块，跳转从一个节点开始，到一个节点结束，这二者就构成了控制流图。

#### Phi 指令

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

启用 `Phi` 指令的 `LLVM IR` 部分代码（开启 `O1` 优化）如下

```llvm 
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

如果不开启优化，则不会使用 `Phi` 指令，这一结构就与传统汇编相同（即 `SSA`，静态单赋值形式）。

```llvm
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

```llvm
; Function Attrs: nofree norecurse nosync nounwind readnone ssp uwtable
define i32 @factorial(i32 %0) local_unnamed_addr #0 {
  %2 = icmp slt i32 %0, 2
  br i1 %2, label %3, label %5

3:                                                ; preds = %5, %1
  %4 = phi i32 [ 1, %1 ], [ %8, %5 ]
  ret i32 %4

5:                                                ; preds = %1, %5
  %6 = phi i32 [ %9, %5 ], [ 2, %1 ]
  %7 = phi i32 [ %8, %5 ], [ 1, %1 ]
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

```llvm
%2 = icmp slt i32 %0, 2
br i1 %2, label %3, label %5
```

首先，程序检查输入的参数是否小于 2。如果小于 2，则直接跳转到标签 `%3`，这意味着输入为 0 或 1。否则，继续执行计算阶乘的循环部分。

**处理输入小于 2 的情况**

```llvm
3:
  ret i32 1
```

如果输入参数小于 2，则直接返回 1。因为阶乘的基本定义是 0 和 1 的阶乘都为 1。

**处理输入大于等于 2 的情况**

```llvm
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

符号的综合属性 `addr` 代表某节点的变量名、常量等；综合属性 `code` 代表某节点已经生成的中间代码。

主要的产生式如下所示。其中 $S$ 代表赋值语句，$E$ 代表表达式。

![主要的产生式](<Screen Shot 2024-05-10 at 3.48.25 PM.png>)

## 数组引用的中间代码翻译

### GEP 指令

即 `getelementptr` 指令，这是其[官方文档](https://llvm.org/docs/LangRef.html#getelementptr-instruction)。获取某个子元素的地址。**不访问内存，只进行计算**。



