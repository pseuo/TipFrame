# 部署说明

TipFrame 可部署到任意静态托管服务。

## 根页面必需文件

- `index.html`
- `config.js`
- `donate.css`
- `donate.js`
- `version.js`
- `images/`

如需使用 `embed.js` 嵌入组件，请一并部署该文件。如需固定的收款人或项目 URL，请部署 `profiles/`（包括 `profiles/profile.css`）和 `profiles/<profile>/index.html`。profile 入口会在外层 HTML 中保留静态 SEO 元数据，并从仓库根目录加载共享应用。

## 使用 GitHub Pages

1. 将项目上传到 GitHub 仓库。
2. 打开仓库的 `Settings`。
3. 打开 `Pages`。
4. 选择 `Deploy from a branch`。
5. 选择 `main` 和 `/root`。
6. 保存并等待部署完成。
7. 打开生成的 GitHub Pages URL。

## 内容安全策略（CSP）

当前页面包含内联主题初始化脚本，因此基础策略需要允许内联脚本：

```http
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

如果二维码图片托管在 CDN 上，请将该来源加入 `img-src`。如需更严格的 CSP，请为内联脚本配置 nonce 或哈希，而不是使用 `'unsafe-inline'`。

## 发布

发布工作流由匹配 `v*.*.*` 的 tag 触发。请保持 `VERSION`、`package.json` 和 `version.js` 的版本一致，运行 `npm run check:version` 后再推送对应 tag。工作流会校验版本，并将静态 ZIP 压缩包附加到 GitHub Release。
