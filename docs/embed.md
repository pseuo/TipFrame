# 嵌入指南

## 使用 iframe

对于不受信任或跨域的嵌入，请使用 TipFrame 所需的最小 sandbox 权限：

```html
<iframe
	src="https://donate.example.com/?embed=1&type=compact"
	style="overflow:hidden; border:0; min-height:90px; width:100%;"
	sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
	frameborder="0"
	scrolling="no">
</iframe>
```

`allow-scripts` 用于启用 TipFrame 交互。只有支付链接必须在新标签页打开时，才需要 `allow-popups` 和 `allow-popups-to-escape-sandbox`。不要为同时具有 `allow-scripts` 的同源 iframe 添加 `allow-same-origin`：该组合可能允许嵌入内容移除自身的 sandbox 限制。

## 尺寸调整消息

TipFrame 优先向 `security.parentOrigin` 指定的 HTTPS 父级来源发送尺寸调整消息。未配置时会尝试从 `document.referrer` 推断父级来源，无法推断时回退为组件自身来源；跨域部署应显式配置该值，以确保行为可靠且可预期：

```js
security: {
	parentOrigin: 'https://www.example.com'
}
```

父页面在应用消息前必须校验消息类型、来源窗口、来源和高度。未授予 `allow-same-origin` 的 sandbox 框架会以 `"null"` 作为消息来源；来源窗口校验仍是必需的。

```js
var iframe = document.querySelector('#tipframe');

window.addEventListener('message', function (event) {
	if (!event.data || event.data.type !== 'tipframe:resize') return;
	if (event.source !== iframe.contentWindow || event.origin !== 'null') return;
	if (!Number.isFinite(event.data.height) || event.data.height < 40 || event.data.height > 1000) return;

	iframe.style.height = Math.ceil(event.data.height) + 'px';
});
```

对于未使用 sandbox 的 iframe，应将 `event.origin` 与 `new URL(iframe.src).origin` 比较，而不是与 `"null"` 比较。

## embed.js

```html
<div data-tipframe data-methods="wechat" data-type="card"></div>
<script src="https://donate.example.com/embed.js"></script>
```

`embed.js` 会创建未使用 sandbox 的 iframe，并自动校验其来源窗口、URL 来源及 40-1000px 的尺寸调整范围。支持多个 `[data-tipframe]` 容器。
