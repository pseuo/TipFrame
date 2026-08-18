# 配置说明

TipFrame 会在运行 `donate.js` 前从 `config.js` 读取 `window.TipFrameConfig`。

## 基本结构

```js
window.TipFrameConfig = {
	page: {},
	modal: {},
	theme: {},
	display: {},
	security: {},
	seo: {},
	i18n: {},
	payments: {},
	profiles: {}
};
```

## 主题

```js
theme: {
	accent: '#1677ff'
}
```

`theme.accent` 用于控制焦点色和强调色。

## 国际化

`donate.js` 内置完整的 `zh-CN` 和 `en` 文案字典。`page`、`modal` 和 `themeLabels` 会覆盖中文默认值，`i18n['zh-CN']` 与 `i18n.en` 可进一步覆盖对应语言区域的文案和无障碍标签。`?lang=zh-CN` 与 `?lang=en` 会选择对应的语言区域。

支付方式的按钮文案、标题和无障碍标签分别由 `payments.xxx.label`、`payments.xxx.title` 和 `payments.xxx.ariaLabel` 配置。

```js
i18n: {
	'zh-CN': {
		page: { title: '如果这个项目帮到了你' },
		labels: { selectMethod: '选择一种方式' }
	},
	en: {
		page: { title: 'If this project helped you' },
		labels: { selectMethod: 'Choose a payment method' }
	}
}
```

合并后的本地化文案必须是长度不超过 300 个字符的非空字符串。无效值会回退到内置文案，并通过 `console.warn` 报告。

## 展示

```js
display: {
	mode: 'auto',
	style: 'glass',
	layout: 'horizontal',
	size: 'md',
	motion: true,
	methods: ['paypal', 'alipay', 'wechat']
}
```

`layout` 支持 `horizontal` 和 `vertical`。

`style` 支持 `glass`、`minimal` 和 `mono`。

纵向布局适合较窄的侧边栏：

```text
index.html?layout=vertical&type=card
```

## 支付图标

```js
payments: {
	wechat: {
		icon: './images/custom-wechat.svg',
		color: '#0aa45a'
	}
}
```

`icon` 会覆盖按钮图标，`color` 会覆盖品牌色。

## 项目配置

```js
profiles: {
	projectA: {
		page: {
			title: '支持 Project A'
		},
		display: {
			methods: ['wechat', 'alipay']
		}
	}
}
```

除非配置了 `security.lockedProfile`，否则可使用 `?profile=projectA` 应用某个 profile。

## 校验

渲染前，TipFrame 会校验 `display.methods`、选定的 profile、支付类型、支付 URL、二维码路径和本地化文案。支付链接必须使用 HTTPS；二维码支付方式必须提供非空的 `qr` 路径。无效支付方式会被禁用，而不会导致运行时错误。如果没有可用且有效的支付方式，页面会提示当前没有可用的支付方式。
