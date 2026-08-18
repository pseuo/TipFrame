# 贡献指南

感谢你帮助改进 TipFrame。

## 本地预览

在项目根目录使用任意静态服务器。

```bash
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000/
```

也可以使用 Node：

```bash
npx serve .
```

## 检查脚本

提交改动前，请运行项目检查：

```bash
npm run check:js
npm run check:version
npm run check:html
```

如果修改了示例配置，也请检查：

```bash
node --check config.example.js
node --check config.zh-CN.example.js
node --check config.en.example.js
```

## 修改配置

面向用户的配置应放在 `config.js` 或某个示例配置文件中。

常用配置项：

- `page`：浏览器标题、页面标题、说明和分享图片。
- `modal`：二维码弹窗文案和错误信息。
- `theme`：强调色。
- `display`：模式、样式、布局、尺寸和支付方式顺序。
- `security`：URL 覆盖和 profile 锁定行为。
- `seo`：robots 行为。
- `payments`：支付链接、二维码图片、标签、图标和颜色。
- `profiles`：可复用的项目/收款人 profile。

避免在 `donate.js` 中硬编码用户专属的收款信息。

## 新增 URL 参数

新增 URL 参数时：

1. 在 `donate.js` 中添加解析逻辑。
2. 如果该参数应支持 `data-*` 嵌入，请将其加入 `embed.js` 的允许列表。
3. 在 `docs/parameters.md` 中记录该参数。
4. 在 `TESTING.md` 中添加手动测试用例。
5. 优先使用 `textContent` 写入文本，不要使用 `innerHTML`。

如果该参数会影响支付链接、二维码路径或可见文案，请考虑它是否应遵守 `security.allowUrlOverrides`。

## 新增 Profile

将稳定的项目或收款人入口放在 `profiles/<name>/index.html`，并在 `profiles/index.html` 链接公开入口。

使用指向共享根目录的相对路径，例如 `../../index.html`，确保 profile 入口在本地和静态部署后都能正常工作。

## 编码约定

- 保持运行时无依赖；新增开发依赖应有明确的质量或维护理由。
- 优先进行小而聚焦的改动。
- 保持静态托管兼容性。
- 将公开配置保留在 `config.js` 中。
- 除非有意公开，否则不要提交真实的个人收款二维码。
