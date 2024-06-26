# 创建并运行 QEMU 虚拟机

`QEMU` 虚拟机可以通过**命令行**和**图形化界面**进行配置。利用命令行进行配置，只需短短几行代码即可创建并运行虚拟机，十分便捷且独树一帜。因此，下面介绍这一种配置方式。

::: warning 提示
开始前，请确认系统已经安装了 `QEMU`。安装的相关内容可参见[《安装 QEMU》](安装qemu.md)
:::

## 创建磁盘映像

虚拟机的操作系统和其他文件安装在虚拟磁盘映像之上，因此，我们首先要创建**磁盘映像**。目前，主流的`QEMU` 虚拟机采用 `qcow2` 文件格式的磁盘映像，我们可以使用 `QEMU` 自带的工具 `qemu-img` 进行创建。

例如，在终端中输入下面的指令，我们就创建了一个大小为 `10G`、文件名为 `disk_image.qcow2` 的 `qcow2` 磁盘映像。你可以根据需要调节映像大小。映像实际占用的空间一般小于创建时指定的大小，它会根据虚拟机对磁盘的使用来动态调节。

```shell
qemu-img create -f qcow2 disk_image.qcow2 10G
```

下面列出了创建指令 `qemu-img create` 的常用选项。

:::details 常用选项

**指令格式**

```shell
qemu-img create [options] filename [size]
```

其中 `options` 是命令选项，`filename` 是要创建的镜像文件的名称，`size` 是镜像文件的大小。    

<br/>

**常用选项**

| 命令选项 `options`                    | 描述                                                   |
|--------------------------|--------------------------------------------------------|
| `-f <格式>`               | 指定创建的镜像文件的格式，常见的格式包括 `qcow2`、`raw` 等。|
| `-o <选项>`               | 设置格式特定的选项，比如 `qcow2` 格式的压缩算法等。         |
| `-b <父镜像> -F <源格式>`   | 创建一个基于指定父镜像的镜像文件，并指定输入镜像文件的格式。   | 
| `-u`                      | 与 `-b` 结合使用，代表强制创建镜像，无论父镜像是否损坏。     |
| `-q`                     | 静默模式，不显示进度信息。                              |

可以通过运行 `qemu-img create -h` 来查看完整的选项列表和帮助信息。
:::

## 下载操作系统光盘映像

下载需要安装在虚拟机上的操作系统光盘映像。这种映像一般为 `.iso` 格式。下载时需要注意版本与架构同**要创建的虚拟机**相适合。在本例中，我们使用 `CentOS-7-x86_64-DVD-2009.iso` 来做演示。我们将这一映像和上文创建的磁盘映像放在同一目录下。

## 创建并运行虚拟机

`QEMU` 虚拟机与其他一些虚拟机软件的区别是它在**创建的同时即开始运行**，其虚拟机配置信息位于每次创建并运行的指令中。我们只需一条指令即可控制虚拟机的启动与配置。

完成了前两步之后，我们就可以启动自己配置的虚拟机啦！在上文的映像目录打开终端，并输入以下命令即可。在本例中，我们设定了虚拟机的架构为 `x86-64`，且为虚拟机分配了 `2G` 内存。

```shell
qemu-system-x86_64 -m 2G \
-hda disk_image.qcow2 \
-cdrom CentOS-7-x86_64-DVD-2009.iso -boot order=d
```

执行完命令后，将弹出该虚拟机的监视器窗口，你可以在此处运行操作系统光盘映像上的安装程序，并等待系统安装完成。至此，你已经成功创建了一个 `QEMU` 虚拟机！:partying_face::partying_face::partying_face:

::: danger 特别注意
在虚拟机关机之前，请勿退出创建虚拟机时打开的终端窗口，也不要键入中断指令（如 `macOS` 上的 `control+C` 组合键）！！！

这相当于**拔台式机的电源**，会使虚拟机丢失数据。
:::

下面列出了创建虚拟机时的常用选项。

:::details 常用选项

**指令格式**

```shell
qemu-system-[architecture] [options] [disk_image]
```

其中 `architecture` 是虚拟机的架构，`options` 是命令选项，`disk_image` 是指定的磁盘映像。

<br/>

**常用架构**

| 虚拟机架构 `architecture`                   | 介绍                                                                                                                                                                                                                                                    |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `qemu-system-i386`     | 该虚拟机的架构是 x86 (32位)，这种架构通常用于旧版的个人电脑和服务器。                                                                                                                |
| `qemu-system-x86_64`   | 该虚拟机的架构是 x86-64 (64位)，这是现代桌面计算机和服务器常用的架构。                                                                                                     |
| `qemu-system-arm`      | 该虚拟机的架构是 ARM，ARM 架构广泛用于嵌入式系统、智能手机和平板电脑。                                                                                                                |
| `qemu-system-ppc`      | 该虚拟机的架构是 PowerPC，PowerPC 架构曾经在一些旧版的 Macintosh 计算机和游戏机上使用。                                                                                  |
| `qemu-system-mips`     | 该虚拟机的架构是 MIPS，MIPS 架构常用于嵌入式系统和网络设备。                                                                                                                         |
| `qemu-system-sparc`    | 该虚拟机的架构是 SPARC，SPARC 架构曾经在一些旧版的 Sun Microsystems 计算机上使用。                                                                                               |
| <span style="white-space:nowrap;">`qemu-system-riscv64`</span>    | 该虚拟机的架构是 RISC-V。RISC-V 是一种开源架构，逐渐在嵌入式系统和学术研究中流行起来。                                                                                           |

<br/>

**常用选项**

|命令选项 `options`| 描述|
|------------------|----|
| `-cpu`         | 指定虚拟机的CPU型号。可以用 `-cpu help` 来查看所有可用的 `cpu`。            |
| `-m <内存大小>`   | 为虚拟机分配内存大小，单位为 `M` 或 `G`（默认为 `M`）。例如，`-m 2G` 代表分配 `2G` 内存。默认为 `128 MiB`。|
| <span style="white-space:nowrap;"> `-hda <文件>` / `-cdrom <文件>`</span> | 指定虚拟机的硬盘镜像文件或光盘镜像文件。|
| `-boot order=<顺序>`         | 指定启动顺序，其中顺序为一个字符串：`a`、`b` 代表软盘，`c` 代表硬盘，`d` 代表光盘，`n` 代表网络设备。  |
| `-net`         | 配置虚拟机的网络选项。                |

:::

# 更多

对于其他运行配置的细节，可参阅官方文档[《运行》](https://www.qemu.org/docs/master/system/invocation.html#invocation)。