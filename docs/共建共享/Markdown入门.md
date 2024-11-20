# 本项目的 Markdown 入门

**Markdown** 是一种**广泛使用的轻量级的标记语言**，可用于将格式设置元素添加到纯文本文档中。它不光可以编写项目文档，也是记笔记的好工具。因此，我们有必要掌握简单的 Markdown 写作技能。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src='/image/mdimages.png' alt="" style="width: 30%"></img>
    <p style="font-size: 12px; color: gray;">Markdown 的徽标</p>
</div>

学习 Markdown 语法并不需要很长时间，一旦您知道如何使用它，就可以在几乎所有地方使用 Markdown 进行编写。本文章主要介绍**本项目**中的 Markdown 用法。

> [!NOTE] 还不熟悉？快速上手 Markdown 的基本用法
> 
> Markdown 的在线资料有很多，如果希望快速上手，应该 **STFW**。当然，下面有一些很好的学习资料：
> 
> - 一个简单而快速的 [Tutorial](https://www.markdowntutorial.com)
> - [维基百科](https://en.wikipedia.org/wiki/Markdown#Example)
> - [Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
> - [官方网站](https://daringfireball.net/projects/markdown/)
>

## 基本

一般来说，如果您使用 **Typora** 或 IDE 的 **Markdown 插件**来书写 Markdown，并且它们都能正确地被显示，那么也就应该可以部署到本项目上。但是，为了方便查阅和提高组织化程度，**格式的统一**仍然是必要的。为此，如果您希望为提交您的代码，您应当**尽可能**遵循以下的规范（不遵循也没事，会再次帮您审核修订的👌）：

- 每篇文章的标题从 `h1` 开始（即 `#`），而不是 `h2`（即 `##`）。`h1` 的内容与文件名一致。
- 标题应该连续，不能越级。例如，`h1` 后面不能直接跟 `h3`。
- **使用全角的中文标点符号**，如 `，`、`。`、`！`、`？`。
- 英文、数字、中文三者混排时，两两之间需要**留一个空格**；但标点符号两侧均不需要空格。
- 公式必须使用 $\LaTeX$ 进行排版。对于比较短的公式，使用 `inline` 模式，即 `$<formula>$`；对于较长的公式，使用 `display` 模式，即：
```
$$
<formula>
$$
```

## 特殊

这里介绍一些在本项目中可用的**特殊 Markdown 语法**，您可以在你的 Markdown 内直接使用，然后渲染到网页上，这样可以增加笔记的可读性。

另外，本项目基于 **Vitepress**，因此你还可以查看 [Vitepress 的文档](https://vitepress.vuejs.org/guide/markdown.html)来获得更多的 Markdown 用法。

### 插入图片

如果要插入图片，应该**先把希望插入的图片 `Upload` 到 `docs/public/image` 目录下**。然后打开 Markdown 文档，在您希望引入图片的位置上，粘贴下面的代码

```html
<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src={PATH} alt="" style="width: {WIDTH}"></img>
    <p style="font-size: 12px; color: gray;">{CAPTION}</p>
</div>
```

其中，`{PATH}` 是图片的路径，为 `/image/{NAME}`，`{NAME}` 是图片的文件名；`{WIDTH}` 是图片的宽度，单位是 `%`；`{CAPTION}` 是图片的说明文字。

例如，上面的 **Markdown 的徽标**这一图片就是通过如下的代码插入的

```html
<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src='/image/mdimages.png' alt="" style="width: 30%"></img>
    <p style="font-size: 12px; color: gray;">Markdown 的徽标</p>
</div>
```

### 插入代码块

除了基本的代码块，还可以插入代码组，方便对照。其语法如下（代码不缩进）：

```md
    ::: code-group

    ```{LANGUAGE} [{TITLE}]
    code block 1
    ```

    ```{LANGUAGE} [{TITLE}]
    code block 2
    ```

    :::
```

其中，`{LANGUAGE}` 是代码块的语言，`{TITLE}` 是代码块的标题。 这是一个例子：

::: code-group

```cpp [hello.cpp]
#include <iostream>

int main () {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

```python [hello.py]
print("Hello, World!")
```
:::

### 插入板块

板块是一种内容块，可以将一组内容组织在一起。其语法如下：

```md
> [!TIP] TIP TITLE
>
> 这是一个提示板块

> [!NOTE] NOTE TITLE
>
> 这是一个笔记板块

> [!IMPORTANT] IMPORTANT TITLE
>
> 这是一个重点板块

> [!WARNING] WARNING TITLE
>
> 这是一个警告板块

> [!DANGER] DANGER TITLE
>
> 这是一个危险板块

::: details TITLE
这是一个细节板块
:::
```

这些代码将会显示如下：

> [!TIP] TIP TITLE
> 
> 这是一个提示板块

> [!NOTE] NOTE TITLE
> 
> 这是一个笔记板块

> [!IMPORTANT] IMPORTANT TITLE
> 
> 这是一个重点板块

> [!WARNING] WARNING TITLE
> 
> 这是一个警告板块

> [!DANGER] DANGER TITLE
> 
> 这是一个危险板块

::: details TITLE
这是一个细节板块
:::

### 纯 HTML

您可以直接在 Markdown 中使用 HTML 代码，以实现更多的效果。例如，下面的代码将会显示一个按钮：

```html 
<button style="background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;">
    Button
</button>
```

<button style="background-color: #4CAF50; /* Green */
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;">Button</button>

## 最后...

加入 **collaborator** 后，您还可以直接查看现有的 Markdown 文档，以便更好地了解本项目的 Markdown 用法。