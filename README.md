# TipFrame

一个轻量的静态打赏/赞助组件，支持 PayPal、支付宝和微信支付，可直接部署或通过 `iframe` 嵌入到网站中。

## 功能特点

- 支持 PayPal 跳转、支付宝二维码、微信二维码。
- 纯静态实现，不依赖后端服务和构建工具。
- 支持 `iframe` 嵌入，适合放到文章页、侧边栏或项目文档中。
- 二维码弹窗支持点击空白处关闭、关闭按钮关闭和 `Esc` 键关闭。
- 响应式布局，兼容桌面端和移动端。
- 支持浅色/深色主题切换，并跟随系统配色偏好。
- 二维码图片加载失败时会显示提示，不会直接留白。
- 在同源 iframe 中会自动同步高度，也提供 `postMessage` 兼容方案。

## 目录结构

```text
.
├── index.html              # 默认打赏页，适合直接部署或 iframe 嵌入
├── donate.css              # 默认页面样式和弹窗样式
├── config.js               # 外部配置文件，升级 donate.js 时优先保留这里
├── config.example.js        # 通用配置示例
├── config.zh-CN.example.js  # 中文配置示例
├── config.en.example.js     # 英文配置示例
├── donate.js               # 默认页面二维码弹窗交互
├── embed.js                # 组件化 iframe 嵌入脚本
├── version.js              # 浏览器端版本号
├── docs/                    # 配置、嵌入、安全、部署文档
├── profiles/                # profile 目录和独立部署入口
└── images/                 # 默认页面图标和收款二维码
```


## 修改收款信息

### PayPal

在 `config.js` 的 `window.TipFrameConfig.payments.paypal.href` 中修改 PayPal 链接：

```js
paypal: {
  kind: 'link',
  href: 'https://www.paypal.me/your-name'
}
```

图标对应的资源文件是 `images/paypal-xiao.png`、`images/alipay-xiao.png`、`images/wechat-xiao.png`。

### 支付宝和微信

默认二维码路径在 `config.js` 的 `window.TipFrameConfig.payments` 中配置：

```js
alipay: {
  kind: 'qr',
  qr: './images/alipay-qr.jpg'
},
wechat: {
  kind: 'qr',
  qr: './images/wechat-qr.jpg'
}
```

你可以直接替换同名图片，也可以修改配置里的 `qr` 指向新的图片路径。

### 页面文案

页面标题、说明文案和二维码弹窗提示集中在 `config.js`：

```js
page: {
  documentTitle: 'TipFrame',
  eyebrow: 'TipFrame',
  title: '如果这个项目帮到了你',
  description: '可以用你习惯的方式支持一下维护。',
  shareImage: './images/like.svg'
},
modal: {
  eyebrow: '扫码支持',
  hintMobile: '长按可保存二维码',
  hintDesktop: '右键可保存二维码',
  caption: '点击空白处或按 Esc 键关闭',
  error: '图片加载失败，请检查二维码路径',
  unavailable: '不可用'
}
```

启用的二维码会在页面加载后检测。如果图片不可访问，对应按钮会自动变成不可用状态，避免用户打开弹窗后才看到空白。二维码不会通过 HTML `preload` 或额外的重复缓存预加载，真正打开弹窗时才绑定到预览图片。

### 品牌色和图标

可以在 `config.js` 里设置全局品牌色和单个支付方式图标：

```js
theme: {
  accent: '#1677ff'
},
payments: {
  wechat: {
    icon: './images/custom-wechat.svg',
    color: '#0aa45a'
  }
}
```

`theme.accent` 会影响焦点色和整体强调色。`payments.xxx.icon` 会覆盖按钮图标，`payments.xxx.color` 会覆盖按钮品牌色。

## URL 参数

可以通过 URL 参数临时控制展示，不需要修改源码：

```text
index.html?theme=dark&methods=paypal,wechat&compact=1&title=支持这个项目
```

支持的参数：

- `theme=light|dark`：指定浅色或深色主题。
- `methods=paypal,alipay,wechat`：指定显示哪些支付方式，并按传入顺序展示。
- `compact=1`：启用紧凑模式，隐藏标题和说明。
- `embed=1`：强制使用嵌入模式。
- `type=compact|full|card`：选择紧凑、完整或卡片模式；未传时，嵌入页面使用紧凑模式，独立页面使用 `config.display.mode`。
- `style=glass|minimal|mono`：玻璃拟态、极简或黑白极简样式。
- `layout=horizontal|vertical`：横向或纵向排列支付按钮。
- `size=sm|md|lg`：控制按钮尺寸。
- `lang=zh-CN|en`：指定中文或英文；不传时使用 `zh-CN`。
- `motion=0`：关闭动画。
- `open=wechat`：页面加载后默认打开某个二维码支付方式，支持 `alipay` 或 `wechat`。
- `profile=projectA`：使用 `config.js` 中的某个收款人/项目配置。
- `noindex=1`：设置 robots 为 `noindex`。
- `title=支持这个项目`：覆盖页面主标题。
- `desc=谢谢你的支持` 或 `description=谢谢你的支持`：覆盖说明文案。
- `eyebrow=Sponsor`：覆盖标题上方的小字。
- `hint=扫码后完成支付`：覆盖二维码提示。
- `caption=点击空白处关闭`：覆盖弹窗底部说明。
- `modalEyebrow=扫码` 或 `modal-eyebrow=扫码`：覆盖二维码弹窗眉题。
- `documentTitle=Donate` 或 `document-title=Donate`：覆盖浏览器标题。
- `image=./images/like.svg`：覆盖 Open Graph / Twitter 分享图。

示例：

```text
index.html?embed=1&type=full&theme=dark&methods=wechat&title=请我喝杯咖啡&desc=感谢你的支持
```

纵向按钮示例：

```text
index.html?layout=vertical&type=card
```

URL 参数只在白名单内生效。可见 UI 文案通过 `textContent` 写入，浏览器标题和分享元数据通过 DOM 属性设置；它们均不会作为 HTML 执行。

完整参数表见 [`docs/parameters.md`](./docs/parameters.md)。

详细文档：

- [配置说明](./docs/configuration.md)
- [参数速查](./docs/parameters.md)
- [嵌入说明](./docs/embed.md)
- [安全说明](./docs/security.md)
- [部署说明](./docs/deployment.md)

### 多收款人配置

可以在 `config.js` 中配置多个 profile：

```js
profiles: {
  projectA: {
    page: {
      title: '支持 Project A'
    },
    display: {
      methods: ['wechat', 'alipay']
    },
    payments: {
      wechat: {
        qr: './images/wechat-qr.jpg'
      }
    }
  }
}
```

访问时使用：

```text
index.html?profile=projectA
```

如果需要固定 URL、独立发布入口或搜索引擎可见的 profile 元数据，使用 [`profiles/`](./profiles/) 下的入口，例如 `profiles/projectA/`。公开 profile 入口保留静态 `title`、`description` 和 Open Graph 信息，同时复用根目录组件，不会维护第二套支付逻辑。

## 版本与发布

版本号同时记录在 `package.json`、`VERSION` 和 `version.js`，三者必须一致。发布前运行版本校验，再创建匹配的 tag，例如 `v2.0.0`；Release workflow 会再次校验版本并生成静态部署压缩包：

```bash
npm run check:version
git tag v2.0.0
git push origin v2.0.0
```

每次 push 和 pull request 会运行 JavaScript 语法检查、HTML 检查、链接检查和 Chromium 浏览器冒烟测试。

## 搜索引擎优化（SEO）

根入口的 `title`、description 和分享信息会根据 URL 参数由 JavaScript 更新，未执行 JavaScript 的爬虫无法看到参数对应的内容。重视搜索引擎收录时，应为 profile 使用 `profiles/<name>/` 静态入口，并把长期稳定的标题和描述写在该入口的 HTML 中；临时的 `?title=`、`?desc=` 参数不适合作为 SEO 页面。

## iframe 嵌入

将下面代码中的 `src` 改成你自己的部署地址：

```html
<iframe
  src="https://example.com/"
  style="overflow:hidden; border:0; min-height:240px; width:100%;"
  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
  frameborder="0"
  scrolling="no">
</iframe>
```

页面被 `iframe` 嵌入时会自动隐藏说明文案，只展示一行紧凑的打赏按钮。可以根据实际页面高度调整 `min-height`。

如果希望嵌入时保留完整标题和说明，可以使用：

```html
<iframe
  src="https://example.com/?embed=1&type=full"
  style="overflow:hidden; border:0; min-height:240px; width:100%;"
  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
  frameborder="0"
  scrolling="no">
</iframe>
```

`allow-scripts` 用于组件交互；支付链接需要新窗口时才保留两个 `allow-popups` 权限。不要在同源 iframe 中同时使用 `allow-scripts` 和 `allow-same-origin`，否则嵌入内容可能移除 sandbox 限制。

跨域嵌入需要在被嵌入站点的 `config.js` 中设置父站点来源：

```js
security: {
  parentOrigin: 'https://www.example.com'
}
```

如果你想让外层页面自动收缩高度，可以在宿主页面监听 `tipframe:resize`。沙箱 iframe 未授予 `allow-same-origin` 时，消息来源为 `"null"`，仍必须校验发送窗口和高度范围：

```js
window.addEventListener('message', function (event) {
  if (!event.data || event.data.type !== 'tipframe:resize') return;

  var iframe = document.querySelector('iframe[src*="donate"]');
  if (!iframe || event.source !== iframe.contentWindow || event.origin !== 'null') return;
  if (!Number.isFinite(event.data.height) || event.data.height < 40 || event.data.height > 1000) return;

  iframe.style.height = Math.ceil(event.data.height) + 'px';
});
```

## 组件化嵌入

如果不想手写 iframe 和高度监听，可以使用 `embed.js`：

```html
<div data-tipframe></div>
<script src="https://example.com/embed.js"></script>
```

`embed.js` 会自动创建 iframe、追加 `embed=1` 参数，并监听 `tipframe:resize` 自动调整高度。

也可以通过 `data-*` 传参：

```html
<div data-tipframe></div>
<script
  src="https://example.com/embed.js"
  data-theme="dark"
  data-methods="paypal,wechat"
  data-type="compact"
  data-style="minimal"
  data-size="sm"
  data-lang="en"
  data-motion="0"
  data-title="支持这个项目"
  data-desc="感谢你的支持"
  data-document-title="Donate">
</script>
```

也支持多个实例，每个容器可以有自己的配置：

```html
<div data-tipframe data-methods="paypal,wechat"></div>
<div data-tipframe data-methods="wechat" data-type="card"></div>
<script src="https://example.com/embed.js"></script>
```

如果 `embed.js` 和 `index.html` 不在同一目录，可以手动指定页面地址：

```html
<div data-tipframe></div>
<script
  src="https://cdn.example.com/tipframe/embed.js"
  data-src="https://example.com/"
  data-methods="wechat">
</script>
```

固定 profile 入口见 [`profiles/`](./profiles/)。目录页会列出公开 profile；二维码错误和 URL 锁定等边界状态可通过 `profiles/brokenQr/` 与 `profiles/lockedDemo/` 手动验证。


## GitHub Pages 部署

1. 将项目上传到 GitHub 仓库。
2. 进入仓库 `Settings`。
3. 打开 `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 选择 `main` 分支和 `/root` 目录。
6. 保存后等待 GitHub Pages 构建完成。
7. 访问 GitHub Pages 给出的地址，例如 `https://your-name.github.io/donate-main/`。
8. 如果使用自定义域名，请在部署平台中确保 HTTPS 已开启。

## 部署方式

可以部署到任意静态托管平台，例如：

- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify
- Nginx/Apache 静态目录
- 对象存储静态网站托管

部署时保持文件目录结构不变，确保 `images/` 中的图片可以被正常访问。

## 自定义配置和样式

- 修改按钮文字、图标和品牌色：编辑 `config.js` 中的 `payments.xxx.label`、`payments.xxx.icon` 和 `payments.xxx.color`。
- 修改独立页和二维码弹窗文案：编辑 `config.js` 中的 `page`、`modal` 和 `i18n`。
- 修改页面布局、按钮尺寸或弹窗外观：编辑 `donate.css`。
- 修改二维码弹窗尺寸：编辑 `donate.css` 中 `.qr-modal__card` 和 `.qr-modal__image`。
- 修改主题色和深色模式：编辑 `donate.css` 顶部的变量和 `html[data-theme='dark']` 区块。


## CSP 建议

如果部署平台允许配置响应头，当前页面的内联主题初始化脚本需要 `script-src` 允许内联脚本：

```http
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

如果你的二维码图片放在第三方 CDN，需要把对应域名加入 `img-src`。如需更严格的 CSP，请为内联脚本配置 nonce 或哈希，而不是使用 `'unsafe-inline'`。

## 隐私说明

TipFrame 是纯静态页面，不依赖后端服务，不主动收集、存储或上传访问者信息。

需要注意：PayPal 等第三方支付链接会跳转到对应平台，第三方平台可能根据自身隐私政策处理访问和支付数据。二维码图片如果托管在第三方 CDN 或对象存储，图片请求日志也可能由对应服务商记录。

## 许可证

[TipFrame Open Use License](./LICENSE)：允许免费使用、修改和分发；发布修改版本时必须明确标识改动，并保留原始版权和许可证信息。
