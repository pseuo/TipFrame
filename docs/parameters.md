# URL 参数

TipFrame 接受少量在允许列表中的 URL 参数。可见 UI 文案使用 `textContent` 写入；浏览器标题和分享元数据通过 DOM 属性设置，均不会作为 HTML 执行。

| 参数 | 默认值 | 示例 | 覆盖配置 | 说明 |
| --- | --- | --- | --- | --- |
| `theme` | 已保存的偏好或系统偏好 | `?theme=dark` | 是 | 设置 `light` 或 `dark` 主题。 |
| `methods` | `config.display.methods` | `?methods=wechat,paypal` | 是 | 按给定顺序展示选定的支付方式。 |
| `compact` | 根据嵌入状态确定 | `?compact=1` | 是 | 启用紧凑模式并隐藏页面文案。 |
| `embed` | 自动检测 iframe 状态 | `?embed=1` | 是 | 强制启用 iframe/嵌入行为。 |
| `type` | 嵌入时为 `compact`，否则为 `config.display.mode` | `?type=card` | 是 | 支持 `compact`、`full` 和 `card`。 |
| `style` | `config.display.style` | `?style=mono` | 是 | 支持 `glass`、`minimal` 和 `mono`。 |
| `layout` | `config.display.layout` | `?layout=vertical` | 是 | 支持 `horizontal` 和 `vertical`。 |
| `size` | `config.display.size` | `?size=sm` | 是 | 支持 `sm`、`md` 和 `lg`。 |
| `lang` | `zh-CN` | `?lang=en` | 是 | 支持 `zh-CN` 和 `en`。 |
| `motion` | `config.display.motion` | `?motion=0` | 是 | 设为 `0`、`false` 或 `off` 时禁用动画。 |
| `open` | 空 | `?open=wechat` | 不适用 | 页面加载时打开二维码支付弹窗，支持 `alipay` 和 `wechat` 等二维码支付方式。 |
| `profile` | 空 | `?profile=projectA` | 是 | 应用来自 `config.profiles` 的 profile。 |
| `noindex` | `config.seo.robots` | `?noindex=1` | 是 | 将 robots 元数据设为 `noindex`。 |
| `title` | `config.page.title` | `?title=支持这个项目` | 是 | 覆盖页面标题文本。 |
| `desc` | `config.page.description` | `?desc=感谢支持` | 是 | 覆盖说明文本。 |
| `description` | `config.page.description` | `?description=Thanks` | 是 | `desc` 的别名。 |
| `eyebrow` | `config.page.eyebrow` | `?eyebrow=Sponsor` | 是 | 覆盖标题上方的小标签。 |
| `hint` | 按设备区分的提示 | `?hint=扫码后完成支付` | 是 | 覆盖二维码弹窗提示。 |
| `caption` | `config.modal.caption` | `?caption=点击空白处关闭` | 是 | 覆盖二维码弹窗底部说明。 |
| `modalEyebrow` | `config.modal.eyebrow` | `?modalEyebrow=扫码` | 是 | 覆盖二维码弹窗眉题文本。 |
| `modal-eyebrow` | `config.modal.eyebrow` | `?modal-eyebrow=Scan` | 是 | `modalEyebrow` 的短横线形式别名。 |
| `documentTitle` | `config.page.documentTitle` | `?documentTitle=Donate` | 是 | 覆盖浏览器标签页标题。 |
| `document-title` | `config.page.documentTitle` | `?document-title=Donate` | 是 | `documentTitle` 的短横线形式别名。 |
| `image` | `config.page.shareImage` | `?image=./images/like.svg` | 是 | 覆盖 Open Graph / Twitter 分享图片。 |

## 仅配置项

这些选项在 `config.js` 中配置，目前未通过 URL 参数开放。

| 配置路径 | 示例 | 说明 |
| --- | --- | --- |
| `theme.accent` | `'#1677ff'` | 设置全局强调色/焦点色。 |
| `security.allowUrlOverrides` | `false` | 阻止 URL 参数覆盖文案、支付方式和 profile。 |
| `security.lockedProfile` | `'projectA'` | 强制使用一个 profile 并忽略 `?profile=`。 |
| `seo.robots` | `'noindex'` | 设置 robots 元数据值。 |
| `payments.paypal.icon` | `'./images/paypal-xiao.png'` | 覆盖支付按钮图标。 |
| `payments.paypal.color` | `'#0070ba'` | 覆盖支付按钮品牌色。 |
| `payments.wechat.enabled` | `false` | 启用或禁用支付方式。 |
| `profiles.projectA` | `{ page, display, payments }` | 定义可复用的项目/收款人 profile。 |

## 示例

深色极简的微信专用嵌入：

```text
index.html?embed=1&type=compact&theme=dark&style=minimal&methods=wechat
```

黑白极简卡片：

```text
index.html?style=mono&type=card
```

纵向卡片布局：

```text
index.html?layout=vertical&type=card
```

加载时打开微信二维码：

```text
index.html?open=wechat
```

使用 profile 和卡片模式：

```text
index.html?profile=projectA&type=card
```
