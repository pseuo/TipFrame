# Profile 入口

`profiles/index.html` 是公开 profile 的目录；是否公开由页面中的链接决定。每个已创建的 profile 子目录都是稳定的部署 URL，例如 `profiles/projectA/`。

入口页面会将 profile 标题、描述和 robots 策略保留在静态 HTML 中，因此爬虫无需执行 JavaScript 即可获取主要元数据。公开 profile 还应包含分享图片等 Open Graph/Twitter 元数据。嵌入的应用仍复用根目录共享的 `index.html`、`donate.js` 和 `config.js` 实现。

## 新增 Profile

1. 在 `config.js` 的 `profiles` 下添加 profile 配置。
2. 基于现有入口创建 `profiles/<name>/index.html`。
3. 更新静态 `title`、`description`、robots 元数据和 iframe 的 `profile=<name>` 查询参数；公开 profile 还应更新 Open Graph/Twitter 元数据。
4. 保持目录名与 `config.js` 中的键一致。
5. 将公开 profile 添加到 `profiles/index.html` 的卡片中；测试专用 profile 不应出现在该页面，并应设置为 `noindex`。

请保留共享的 `profile.css` 引用和 `profile-frame` 类，以确保移动端视口行为、深色模式和 iframe 尺寸保持一致。
