# 更新日志

本文档记录 TipFrame 的所有重要变更。

## 未发布

## 2.0.0

- 在 `profiles/` 下新增稳定的 profile 部署入口。
- 新增版本元数据和基于 tag 的发布打包。
- 在 GitHub Actions 中新增 JavaScript、HTML、链接和浏览器冒烟检查。
- 移除重复的二维码预加载。
- 为较新的 `svh` 和 `color-mix()` CSS 特性新增回退声明。

- 新增外部 `config.js` 支持，使用户配置可与 `donate.js` 分离。
- 新增主题、支付方式、紧凑/完整/卡片模式、标题文案、语言、动画、尺寸、样式和 Open Graph 图片等 URL 参数。
- 新增 `?open=wechat` 形式的二维码默认打开功能。
- 新增 `?profile=projectA` 形式的多收款人/profile 配置。
- 新增深色模式、极简样式、卡片模式、按钮尺寸和禁用动画功能。
- 新增 `style=mono` 黑白极简样式。
- 通过同源高度更新和 `postMessage` 回退方案新增 iframe 自动调高。
- 新增支持多个 `[data-tipframe]` 实例的可复用 `embed.js`。
- 在独立页面中新增嵌入代码生成器。
- 新增二维码图片预检查，在打开前禁用不可用的二维码支付方式。
- 新增 Open Graph / Twitter 元数据和 favicon 支持。
- 新增隐私、安全、CSP、sandbox、测试和 GitHub Pages 文档。

## 1.0.0

- 初始静态打赏组件。
- 支持 PayPal 跳转、支付宝二维码和微信支付二维码。
- 包含响应式布局、二维码弹窗和适合 iframe 的渲染方式。
