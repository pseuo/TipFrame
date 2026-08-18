# 安全说明

## 纯静态实现

TipFrame 是静态页面，本身不会收集、存储或上传访客数据。

## URL 覆盖

对于公开部署，可禁用基于 URL 的文案/支付方式/profile 覆盖：

```js
security: {
	allowUrlOverrides: false
}
```

禁用后，`title`、`desc`、`methods` 和 `profile` 等 URL 参数会被忽略。`theme`、`style`、`type`、`size`、`layout` 和 `motion` 等展示参数仍然有效；`noindex` 仍可控制 robots 元数据。

## 锁定 Profile

```js
security: {
	lockedProfile: 'projectA'
}
```

此设置会强制使用一个 profile 并忽略 `?profile=`。

## noindex

可使用配置：

```js
seo: {
	robots: 'noindex'
}
```

或使用 URL：

```text
?noindex=1
```

## URL 文本安全

可见 UI 文案使用 `textContent` 写入，而不是 `innerHTML`。浏览器标题和元数据通过 DOM 属性设置，也不会作为 HTML 解析。
