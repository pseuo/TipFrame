# 手动测试清单

请先使用本地静态服务器运行页面：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000/` 并测试以下 URL。

## 展示参数

- `/?theme=dark`
- `/?style=minimal`
- `/?style=mono&type=card`
- `/?type=card`
- `/?size=sm`
- `/?lang=en`
- `/?motion=0`
- `/?methods=wechat`
- `/?layout=vertical&type=card`
- `/?theme=dark&style=minimal&type=card&size=sm&methods=wechat`

## 嵌入参数

- `/?embed=1&type=compact`
- `/?embed=1&type=full`
- `/?embed=1&type=card&style=minimal`

## 默认打开

- `/?open=wechat`
- `/?open=alipay`
- `/?methods=wechat&open=wechat`

预期结果：二维码图片可用时，对应的二维码弹窗会自动打开。

## 项目配置

- `/?profile=projectA`
- `/?profile=projectB&methods=wechat`
- `/?profile=projectA&open=wechat`

预期结果：选定的 profile 会覆盖 `config.js` 中的页面文案和支付设置。

打开 `profiles/projectA/` 和 `profiles/projectB/`。

预期结果：公开 profile 入口展示静态页面元数据，并加载同一个共享支付组件。

## 二维码错误状态

临时将 `config.js` 中的一个二维码路径改为不存在的图片，例如：

```js
qr: './images/missing-qr.jpg'
```

预期结果：弹窗打开前，对应支付按钮会被禁用并显示 `不可用`。

## Profile 入口

打开 `profiles/`。

打开 `profiles/projectA/` 和 `profiles/projectB/`。

打开 `profiles/brokenQr/`。

打开 `profiles/lockedDemo/`。

预期结果：

- profile 目录链接到每个公开 profile。
- JavaScript 执行前即可获得公开 profile 的元数据。
- 共享支付组件在每个 profile iframe 内渲染。
- 二维码损坏的 profile 会禁用无效支付方式。
- 锁定的 profile 会忽略 URL 覆盖。
- 每个 profile iframe 都会自动调整高度且不显示滚动条。
