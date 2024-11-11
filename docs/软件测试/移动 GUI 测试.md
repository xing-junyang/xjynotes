# 移动应用 GUI 测试

## GUI 测试概述

产品需要服务于用户，提供最好的、正确的用户体验。GUI 则是用户与界面交互的接口，包含用户所有的感受。因此，GUI **测试**是非常重要的一环。这当中，移动端的 GUI 测试和桌面端不同，**面临着更大的挑战**。

### 面临的挑战

- **环境碎片化**：不同的设备、不同的系统版本、不同的 SoC 等；
- **快速演化的开发平台**：新的功能、新的 API、新的 SDK 等；

### 继续研究方向

- 增强测试可复用性
- 保证测试的一致性
- 提高测试效率，减少开销
- 实现快速回归测试，加快测试进度
- 减少人为因素，实现更广泛的测试覆盖度

## GUI 测试工具

GUI 测试 = **控件定位和匹配** + **操作执行**

## 传统脚本驱动

### Selenium

Selenium 是一个开源的自动化测试工具，专门用于**自动化网页浏览器的操作**。它允许测试人员利用 `Java`、`Python`、`JavaScript` 等编程语言来模拟用户对网页的各种操作，支持 `Chrome` 和 `FireFox` 等多种浏览器。

Selenium 可以利用 `WebDriver` 来驱动浏览器，实现两类主要的操作：**获取**页面元素和与页面元素**交互**。

```python
import selenium
from selenium import webdriver

driver = webdriver.Chrome() # 创建一个 Chrome 浏览器实例
driver.get("https://www.example.com") # 打开网页
element = driver.find_element_by_id("element_id") # 获取元素
element.click() # 点击元素
element.send_keys("text") # 输入文本...
```

### Appium

Appium 是一个扩展了 `Selenium` 的 `WebDriver` 协议来支持移动应用自动化的工具，允许使用 `Selenium` 的客户端库来编写适用于 `iOS` 和 `Android` 平台的应用测试脚本。

在 Appium 中，一切都是从创建 一个会话开始的。会话是通过发送一个包含 Desired Capabilities 的 POST 请求到 Appium 服务器来创建的，这些 Capabilities 指定了测试的参数，比如**设备、操作系统版本、应用路径**等。Appium 服务器接收到来自客户 端的命令后，将其**翻译**成适合移动平台的动作。 对于 `iOS`，Appium 通过 `Apple's XCUITest` 库发送命令;对于 `Android`，它可以使用 `UiAutomator` 或 `Espresso`。

Appium 的优势有：**跨平台能力强，与 `Selenium` 语法一致，无需修改应用代码和配置，支持多种编程语言**。

```python
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy
desired_caps = {
    "platformName": "Android",
    "deviceName":"emulator-5554",
    "appPackage": "com.example.myapp",
    "appActivity": "com.example.myapp.MainActivity"
}
driver = webdriver.Remote("http://localhost:4723/wd/hub", desired caps) # 创建一个 Appium 会话
driver.find element (AppiumBy-ID, "com.example.myapp:id/settings_button").click() # 点击设置按钮
toggle = driver.find element (AppiumBy.ID, "com.example.myapp:id/notification_toggle") # 获取通知开关
if toggle.get _attribute("checked") == "false":
    toggle.click()
    print("通知开关已打开")
else:
    toggle.click()
    print("通知开关已关闭"）
driver.quit()
```

## 基于简单图像的脚本驱动

### Sikuli

Sikuli 是一个**通过图像**来进行 GUI **定位**的工具。用户首先需要**截取**屏幕上的图像，然后编写相应脚本，通过**图像匹配**来定位 GUI 控件。在识别时可以提供一个**相似度**参数，来控制匹配的精度。匹配后，可以**执行用户定义的操作**，如点击、输入文字或者拖拽等。

### 存在的问题

- **对图像的依赖性**：图像变化会导致脚本失效，且像素级别的匹配会受到分辨率、缩放等因素的影响；
- **人为因素**：需要用户手动截取图像，且匹配的相似度参数需要用户自行调整；
- **性能问题**：图像匹配的性能较差，不适合大规模测试。

## 基于深度图像理解驱动

使用深度图像理解技术，可以实现**更加智能**的 GUI 定位和匹配。这种技术可以**自动学习**图像的特征，从而**减少人为因素**，并可以实现**基于截图与布局理解的跨平台测试回放**。例如，现在的**麦当劳点餐小程序**的微信版和支付宝版基本一致，可以期望使用这种手段进行跨平台测试。

这一驱动分为几个方面：**控件图像提取、控件属性识别、页面布局刻画、场景语义分析**。而语义分析的内容又包括控件**类型判断、文本提取、关系提取和意图识别**等。

当然，深度图像理解测试工具同样存在局限性。由于这一工具仍依赖操作系统接口执行测试操作（即**侵入式**），因此它难以模拟真实场景下人的交互操作（如，感知不到异形屏幕对 UI 控件的遮挡）。

## 非侵入式的方法：机械臂引入

可以在深度图像理解的基础上，引入**机械臂**来实现**非侵入式**的 GUI 测试。利用外置摄像头捕获屏幕，AI 算法选择目标控件并生成测试操作；机械臂可以模拟人的手部动作，实现对 GUI 控件的**真实操作**。这样就可以模拟人为交互，**摆脱底层依赖**。

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:10px">
    <img src='/image/Screen Shot 2024-11-11 at 4.19.24 PM.png' alt="" style="width:90%;"></img>
    <p style="font-size: 12px; color: gray;">Robotest 项目的基本框架</p>
</div>