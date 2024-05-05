# 安装 QEMU

## 对于 Linux 系统

`Ubuntu` 发行版可以直接采用下面指令进行安装

```shell
apt-get install qemu-system
```

`CentOS/RHEL` 发行版可以直接采用下面指令进行安装

```shell
yum install qemu-kvm
```

## 对于 macOS 系统

在 `macOS` 平台上可使用 [`Homebrew`](https://brew.sh) 进行安装

```shell
brew install qemu
```

::: details 安装 Homebrew
可以使用以下指令在 `macOS` 系统的终端下安装 `Homebrew`

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
:::

## 全平台

也可使用编译源代码的方式进行安装，这一方式支持多种平台，也支持在无联网条件下进行安装。

首先下载源代码压缩包。文中下载的是9.0.0版，可通过更改文件名的后缀来下载不同的版本。

```shell
wget https://download.qemu.org/qemu-9.0.0.tar.xz
```

然后解压并编译安装

```shell
tar xvJf qemu-9.0.0.tar.xz
cd qemu-9.0.0
./configure
make
```

::: warning 提示
确保系统已经安装了依赖的软件，如`make`及相应解压缩软件等。
:::
