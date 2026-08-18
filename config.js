window.TipFrameConfig = {
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
	},
	theme: {
		accent: '#1677ff'
	},
	display: {
		mode: 'auto',
		style: 'glass',
		layout: 'horizontal',
		size: 'md',
		motion: true,
		methods: ['paypal', 'alipay', 'wechat']
	},
	security: {
		allowUrlOverrides: true,
		lockedProfile: '',
		parentOrigin: ''
	},
	seo: {
		robots: 'index,follow'
	},
	i18n: {
		'zh-CN': {
			labels: {
				selectMethod: '选择一种方式',
				safePayment: '安全跳转或扫码完成支付',
				noMethods: '暂无可用支付方式',
				buildEmbedCode: '生成嵌入代码',
				hideEmbedCode: '隐藏嵌入代码',
				embedBuilder: '生成嵌入代码',
				theme: '主题',
				mode: '模式',
				style: '样式',
				size: '尺寸',
				paymentMethods: '支付方式',
				copy: '复制代码',
				copied: '已复制',
				close: '关闭',
				closeQr: '关闭二维码',
				qrDialog: '二维码弹窗'
			}
		},
		en: {
			page: {
				documentTitle: 'TipFrame',
				eyebrow: 'TipFrame',
				title: 'If this project helped you',
				description: 'You can support ongoing maintenance in your preferred way.',
				shareImage: './images/like.svg'
			},
			modal: {
				eyebrow: 'Scan to support',
				hintMobile: 'Long press to save the QR code',
				hintDesktop: 'Right click to save the QR code',
				caption: 'Click outside or press Esc to close',
				error: 'Image failed to load. Check the QR code path.',
				unavailable: 'Unavailable'
			},
			themeLabels: {
				light: 'Dark mode',
				dark: 'Light mode'
			},
			labels: {
				selectMethod: 'Choose a payment method',
				safePayment: 'Continue securely or scan a QR code to pay',
				noMethods: 'No payment methods are currently available.',
				buildEmbedCode: 'Generate embed code',
				hideEmbedCode: 'Hide embed code',
				embedBuilder: 'Generate embed code',
				theme: 'Theme',
				mode: 'Mode',
				style: 'Style',
				size: 'Size',
				paymentMethods: 'Payment methods',
				copy: 'Copy code',
				copied: 'Copied',
				close: 'Close',
				closeQr: 'Close QR code',
				qrDialog: 'QR code dialog'
			}
		}
	},
	payments: {
		paypal: {
			enabled: true,
			kind: 'link',
			href: 'https://www.paypal.me/7fffan',
			label: 'PayPal',
			ariaLabel: 'PayPal 捐赠 / PayPal donate',
			icon: './images/paypal-xiao.png',
			color: '#0070ba'
		},
		alipay: {
			enabled: true,
			kind: 'qr',
			qr: './images/alipay-qr.jpg',
			title: 'Alipay',
			label: 'Alipay',
			ariaLabel: '支付宝 / Alipay 二维码',
			icon: './images/alipay-xiao.png',
			color: '#1677ff'
		},
		wechat: {
			enabled: true,
			kind: 'qr',
			qr: './images/wechat-qr.jpg',
			title: 'WeChat Pay',
			label: 'WeChat',
			ariaLabel: '微信支付 / WeChat Pay 二维码',
			icon: './images/wechat-xiao.png',
			color: '#0aa45a'
		}
	},
	profiles: {
		projectA: {
			page: {
				documentTitle: '支持 Project A',
				title: '支持 Project A',
				description: '感谢你支持 Project A 的持续维护。'
			},
			display: {
				methods: ['wechat', 'alipay']
			},
			payments: {
				alipay: {
					qr: './images/alipay-qr.jpg'
				},
				wechat: {
					qr: './images/wechat-qr.jpg'
				}
			}
		},
		projectB: {
			page: {
				documentTitle: 'Support Project B',
				title: 'Support Project B',
				description: 'Thanks for supporting Project B.'
			},
			display: {
				methods: ['paypal', 'wechat'],
				style: 'minimal'
			},
			payments: {
				paypal: {
					href: 'https://www.paypal.me/7fffan'
				},
				wechat: {
					qr: './images/wechat-qr.jpg'
				}
			}
		},
		brokenQr: {
			page: {
				documentTitle: '二维码错误演示',
				title: '二维码错误演示',
				description: '这个 profile 用于测试二维码图片路径错误时的禁用状态。'
			},
			display: {
				methods: ['alipay', 'wechat']
			},
			payments: {
				wechat: {
					qr: './images/missing-qr.jpg'
				}
			}
		},
		lockedDemo: {
			page: {
				documentTitle: 'URL 覆盖禁用演示',
				title: 'URL 覆盖禁用演示',
				description: '这个 profile 用于演示 allowUrlOverrides=false 时 URL 文案和支付方式不会覆盖配置。'
			},
			display: {
				methods: ['wechat'],
				layout: 'vertical'
			},
			security: {
				allowUrlOverrides: false,
				lockedProfile: 'lockedDemo'
			}
		}
	}
};
