document.addEventListener('DOMContentLoaded', function () {
	var body = document.body;
	var pageShell = document.querySelector('.page-shell');
	var isEmbedded = false;
	var searchParams = new URLSearchParams(window.location.search);
	var themeToggle = document.querySelector('.theme-toggle');
	var pageEyebrow = document.querySelector('.page-copy__eyebrow');
	var pageTitle = document.querySelector('.page-copy h1');
	var pageDescription = document.querySelector('.page-copy p:last-child');
	var generator = document.querySelector('.embed-builder');
	var generatorToggle = document.querySelector('.embed-builder-toggle');
	var generatorOutput = document.querySelector('.embed-builder__output');
	var generatorCopy = document.querySelector('.embed-builder__copy');
	var paymentEmpty = document.querySelector('.payment-empty');
	var overlay = document.querySelector('.qr-modal');
	var card = document.querySelector('.qr-modal__card');
	var image = document.querySelector('.qr-modal__image');
	var status = document.querySelector('.qr-modal__status');
	var title = document.getElementById('qr-title');
	var hint = document.getElementById('qr-hint');
	var caption = document.getElementById('qr-caption');
	var closeButton = document.querySelector('.qr-modal__close');
	var liveRegion = document.getElementById('qr-live');
	var methodButtons = document.querySelectorAll('[data-method]');
	var lastTrigger = null;
	var focusBeforeModal = null;
	var backgroundAriaHidden = null;
	var closeTimer = null;
	var resizeObserver = null;
	var themeStorageKey = 'tipframe-theme';
	var donationConfig = {
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
		themeLabels: {
			light: '深色模式',
			dark: '浅色模式'
		},
		payments: {
			paypal: {
				enabled: true,
				kind: 'link',
				href: 'https://www.paypal.me/7fffan',
				label: 'PayPal',
				ariaLabel: 'PayPal 捐赠 / PayPal donate',
				icon: './images/paypal-xiao.png'
			},
			alipay: {
				enabled: true,
				kind: 'qr',
				qr: './images/alipay-qr.jpg',
				title: 'Alipay',
				label: 'Alipay',
				ariaLabel: '支付宝 / Alipay 二维码',
				icon: './images/alipay-xiao.png'
			},
			wechat: {
				enabled: true,
				kind: 'qr',
				qr: './images/wechat-qr.jpg',
				title: 'WeChat Pay',
				label: 'WeChat',
				ariaLabel: '微信支付 / WeChat Pay 二维码',
				icon: './images/wechat-xiao.png'
			}
		}
	};
	var i18n = {
		'zh-CN': {
			page: donationConfig.page,
			modal: donationConfig.modal,
			themeLabels: donationConfig.themeLabels,
			labels: {
				copy: '复制代码',
				copied: '已复制',
				unavailable: '不可用',
				brandHome: 'TipFrame 首页',
				themeToggle: '切换深浅色主题',
				supportCard: '支持项目',
				supportDescription: '打赏说明',
				selectMethod: '选择一种方式',
				paymentMethods: '支付方式',
				safePayment: '安全跳转或扫码完成支付',
				noMethods: '暂无可用支付方式',
				buildEmbedCode: '生成嵌入代码',
				hideEmbedCode: '隐藏嵌入代码',
				embedBuilder: '生成嵌入代码',
				theme: '主题',
				light: '浅色',
				dark: '深色',
				mode: '模式',
				compact: '紧凑',
				full: '完整',
				card: '卡片',
				style: '样式',
				glass: '玻璃拟态',
				minimal: '极简',
				mono: '黑白极简',
				size: '尺寸',
				small: '小',
				medium: '中',
				large: '大',
				close: '关闭',
				closeQr: '关闭二维码',
				qrDialog: '二维码弹窗',
				qrCode: '二维码',
				loading: '，正在加载...',
				qrOpening: '已打开 {method} 二维码弹窗。',
				qrLoaded: '{method} 二维码已加载。',
				qrClosed: '二维码弹窗已关闭。'
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
				copy: 'Copy code',
				copied: 'Copied',
				unavailable: 'Unavailable',
				brandHome: 'TipFrame home',
				themeToggle: 'Toggle color theme',
				supportCard: 'Support this project',
				supportDescription: 'Support details',
				selectMethod: 'Choose a payment method',
				paymentMethods: 'Payment methods',
				safePayment: 'Continue securely or scan a QR code to pay',
				noMethods: 'No payment methods are currently available.',
				buildEmbedCode: 'Generate embed code',
				hideEmbedCode: 'Hide embed code',
				embedBuilder: 'Generate embed code',
				theme: 'Theme',
				light: 'Light',
				dark: 'Dark',
				mode: 'Mode',
				compact: 'Compact',
				full: 'Full',
				card: 'Card',
				style: 'Style',
				glass: 'Glass',
				minimal: 'Minimal',
				mono: 'Monochrome',
				size: 'Size',
				small: 'Small',
				medium: 'Medium',
				large: 'Large',
				close: 'Close',
				closeQr: 'Close QR code',
				qrDialog: 'QR code dialog',
				qrCode: 'QR code',
				loading: ' Loading...',
				qrOpening: '{method} QR code dialog opened.',
				qrLoaded: '{method} QR code loaded.',
				qrClosed: 'QR code dialog closed.'
			}
		}
	};
	var defaultI18n = JSON.parse(JSON.stringify(i18n));
	var activeMethods = [];
	var activeLang = 'zh-CN';

	function isPlainObject(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	}

	function mergeConfig(target, source) {
		if (!isPlainObject(source)) return target;

		Object.keys(source).forEach(function (key) {
			if (isPlainObject(source[key]) && isPlainObject(target[key])) {
				mergeConfig(target[key], source[key]);
			} else {
				target[key] = source[key];
			}
		});

		return target;
	}

	function reportConfigError(message) {
		if (window.console && window.console.warn) {
			window.console.warn('[TipFrame] ' + message);
		}
	}

	function isHttpsUrl(value) {
		try {
			return new URL(value).protocol === 'https:';
		} catch (error) {
			return false;
		}
	}

	function validateTextConfig(target, fallback, path) {
		Object.keys(fallback).forEach(function (key) {
			var value = target[key];
			var fallbackValue = fallback[key];

			if (isPlainObject(fallbackValue)) {
				if (!isPlainObject(value)) {
					reportConfigError(path + '.' + key + ' must be an object.');
					target[key] = JSON.parse(JSON.stringify(fallbackValue));
				}
				validateTextConfig(target[key], fallbackValue, path + '.' + key);
			} else if (typeof value !== 'string' || !value.trim() || value.length > 300) {
				reportConfigError(path + '.' + key + ' must be a non-empty string up to 300 characters.');
				target[key] = fallbackValue;
			}
		});
	}

	function validateConfig() {
		if (!isPlainObject(donationConfig.security)) {
			reportConfigError('security must be an object.');
			donationConfig.security = { allowUrlOverrides: true, lockedProfile: '', parentOrigin: '' };
		}

		if (!isPlainObject(donationConfig.display)) {
			reportConfigError('display must be an object.');
			donationConfig.display = { mode: 'auto', style: 'glass', layout: 'horizontal', size: 'md', motion: true, methods: [] };
		}
		if (!Array.isArray(donationConfig.display.methods)) {
			reportConfigError('display.methods must be an array.');
			donationConfig.display.methods = [];
		}

		if (!isPlainObject(donationConfig.payments)) {
			reportConfigError('payments must be an object.');
			donationConfig.payments = {};
		}

		donationConfig.display.methods = donationConfig.display.methods.filter(function (method, index, methods) {
			var payment = donationConfig.payments[method];
			var valid = typeof method === 'string' && isPlainObject(payment) && methods.indexOf(method) === index;

			if (!valid) reportConfigError('display.methods contains an unknown or duplicate payment method.');
			return valid;
		});

		Object.keys(donationConfig.payments).forEach(function (method) {
			var payment = donationConfig.payments[method];

			if (!isPlainObject(payment)) {
				reportConfigError('payments.' + method + ' must be an object.');
				delete donationConfig.payments[method];
				return;
			}
			if (payment.kind !== 'link' && payment.kind !== 'qr') {
				reportConfigError('payments.' + method + '.kind must be "link" or "qr".');
				payment.enabled = false;
				return;
			}
			if (payment.kind === 'link' && !isHttpsUrl(payment.href)) {
				reportConfigError('payments.' + method + '.href must use HTTPS.');
				payment.enabled = false;
			}
			if (payment.kind === 'qr' && (typeof payment.qr !== 'string' || !payment.qr.trim())) {
				reportConfigError('payments.' + method + '.qr must be a non-empty path.');
				payment.enabled = false;
			}
		});
	}

	mergeConfig(donationConfig, window.TipFrameConfig);
	if (!isPlainObject(donationConfig.security)) {
		donationConfig.security = { allowUrlOverrides: true, lockedProfile: '', parentOrigin: '' };
	}
	var activeProfile = getActiveProfile();
	if (activeProfile) {
		if (!isPlainObject(donationConfig.profiles) || !isPlainObject(donationConfig.profiles[activeProfile])) {
			reportConfigError('Profile "' + activeProfile + '" does not exist.');
		} else {
			mergeConfig(donationConfig, donationConfig.profiles[activeProfile]);
		}
	}
	validateConfig();
	i18n = JSON.parse(JSON.stringify(defaultI18n));
	mergeConfig(i18n['zh-CN'].page, donationConfig.page);
	mergeConfig(i18n['zh-CN'].modal, donationConfig.modal);
	mergeConfig(i18n['zh-CN'].themeLabels, donationConfig.themeLabels);
	mergeConfig(i18n, donationConfig.i18n);
	if (!isPlainObject(i18n['zh-CN'])) i18n['zh-CN'] = JSON.parse(JSON.stringify(defaultI18n['zh-CN']));
	if (!isPlainObject(i18n.en)) i18n.en = JSON.parse(JSON.stringify(defaultI18n.en));
	validateTextConfig(i18n['zh-CN'], defaultI18n['zh-CN'], 'i18n.zh-CN');
	validateTextConfig(i18n.en, defaultI18n.en, 'i18n.en');

	try {
		isEmbedded = window.self !== window.top;
	} catch (error) {
		isEmbedded = true;
	}

	if (searchParams.get('embed') === '1' || searchParams.get('embed') === 'true') {
		isEmbedded = true;
	}

	if (isEmbedded) {
		body.classList.add('is-embedded');
	}

	if (!overlay || !card || !image || !title || !closeButton || !methodButtons.length) return;

	function getParam(name) {
		var value = searchParams.get(name);
		return value === null ? '' : value.trim();
	}

	function getCanonicalUrl() {
		return window.location.href.split('?')[0].split('#')[0];
	}

	function isUrlOverrideAllowed() {
		return !donationConfig.security || donationConfig.security.allowUrlOverrides !== false;
	}

	function getOverrideParam(name) {
		return isUrlOverrideAllowed() ? getParam(name) : '';
	}

	function getActiveProfile() {
		if (donationConfig.security && donationConfig.security.lockedProfile) {
			return donationConfig.security.lockedProfile;
		}

		return window.TipFrameEntryProfile || (isUrlOverrideAllowed() ? getParam('profile') : '');
	}

	function hexToRgb(hex) {
		var normalized = (hex || '').trim().replace(/^#/, '');
		var value;

		if (/^[0-9a-f]{3}$/i.test(normalized)) {
			normalized = normalized.split('').map(function (char) {
				return char + char;
			}).join('');
		}

		if (!/^[0-9a-f]{6}$/i.test(normalized)) return '';

		value = parseInt(normalized, 16);
		return ((value >> 16) & 255) + ', ' + ((value >> 8) & 255) + ', ' + (value & 255);
	}

	function getMode() {
		var type = getParam('type').toLowerCase();
		var compact = getParam('compact').toLowerCase();

		if (compact === '1' || compact === 'true' || type === 'compact') return 'compact';
		if (type === 'card') return 'card';
		if (type === 'full') return 'full';
		return isEmbedded ? 'compact' : donationConfig.display.mode;
	}

	function getStyleName() {
		var style = getParam('style').toLowerCase() || donationConfig.display.style;
		return ['glass', 'minimal', 'mono'].indexOf(style) === -1 ? 'glass' : style;
	}

	function getSizeName() {
		var size = getParam('size').toLowerCase() || donationConfig.display.size;
		return ['sm', 'md', 'lg'].indexOf(size) === -1 ? 'md' : size;
	}

	function getLayoutName() {
		var layout = getParam('layout').toLowerCase() || donationConfig.display.layout;
		return layout === 'vertical' ? 'vertical' : 'horizontal';
	}

	function getMotionEnabled() {
		var motion = getParam('motion').toLowerCase();
		if (motion === '0' || motion === 'false' || motion === 'off') return false;
		return donationConfig.display.motion !== false;
	}

	function getLanguage() {
		var lang = getParam('lang');

		if (lang === 'en' || lang === 'zh-CN') return lang;
		return 'zh-CN';
	}

	function getOpenMethod() {
		var method = getParam('open').toLowerCase();

		if (!method || activeMethods.indexOf(method) === -1) return '';
		if (!donationConfig.payments[method] || donationConfig.payments[method].kind !== 'qr') return '';

		return method;
	}

	function parseMethods() {
		var methods = getOverrideParam('methods');
		var allowed = donationConfig.display.methods.filter(function (method) {
			return donationConfig.payments[method] && donationConfig.payments[method].enabled !== false;
		});

		if (!methods) return allowed.slice();

		methods = methods.split(',').map(function (method) {
			return method.trim().toLowerCase();
		}).filter(function (method) {
			return allowed.indexOf(method) !== -1;
		});

		return methods.length ? methods : allowed.slice();
	}

	function getConfiguredText(name, fallback) {
		var value = getOverrideParam(name) || getOverrideParam(name.replace(/[A-Z]/g, function (letter) {
			return '-' + letter.toLowerCase();
		}));

		return value && value.length <= 300 ? value : fallback;
	}

	function shouldNoindex() {
		var noindex = getParam('noindex').toLowerCase();
		var robots = donationConfig.seo && donationConfig.seo.robots;

		return noindex === '1' || noindex === 'true' || robots === 'noindex';
	}

	function applyMethodOrder() {
		var paymentGrid = document.querySelector('.payment-grid');

		if (!paymentGrid) return;

		activeMethods.forEach(function (method) {
			var button = paymentGrid.querySelector('[data-method="' + method + '"]');
			if (button) {
				paymentGrid.appendChild(button);
			}
		});
	}

	function getLocalizedText(langConfig, path) {
		return path.split('.').reduce(function (value, key) {
			return value && value[key];
		}, langConfig) || '';
	}

	function applyLocalizedElements(langConfig) {
		document.querySelectorAll('[data-i18n]').forEach(function (element) {
			var value = getLocalizedText(langConfig, element.getAttribute('data-i18n'));
			if (value) element.textContent = value;
		});
		document.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
			var value = getLocalizedText(langConfig, element.getAttribute('data-i18n-aria-label'));
			if (value) element.setAttribute('aria-label', value);
		});
	}

	function interpolate(text, values) {
		return text.replace(/\{(\w+)\}/g, function (match, key) {
			return values[key] || '';
		});
	}

	function announce(message) {
		if (liveRegion) liveRegion.textContent = message || '';
	}

	function applyCopy() {
		var modalEyebrow = document.querySelector('.qr-modal__eyebrow');
		var langConfig = i18n[activeLang] || i18n['zh-CN'];
		var documentTitle = getConfiguredText('documentTitle', langConfig.page.documentTitle);
		var eyebrowText = getConfiguredText('eyebrow', langConfig.page.eyebrow);
		var titleText = getConfiguredText('title', langConfig.page.title);
		var descriptionText = getConfiguredText('desc', getConfiguredText('description', langConfig.page.description));
		var defaultHint = window.matchMedia && window.matchMedia('(pointer: coarse)').matches ? langConfig.modal.hintMobile : langConfig.modal.hintDesktop;
		var hintText = getConfiguredText('hint', defaultHint);
		var captionText = getConfiguredText('caption', langConfig.modal.caption);
		var modalEyebrowText = getConfiguredText('modalEyebrow', langConfig.modal.eyebrow);
		var shareImage = getConfiguredText('image', langConfig.page.shareImage);
		var canonicalUrl = getCanonicalUrl();

		document.title = documentTitle;
		document.documentElement.lang = activeLang;
		if (pageEyebrow) pageEyebrow.textContent = eyebrowText;
		if (pageTitle) pageTitle.textContent = titleText;
		if (pageDescription) pageDescription.textContent = descriptionText;
		if (hint && hint.firstChild) hint.firstChild.nodeValue = hintText;
		if (caption) caption.textContent = captionText;
		if (modalEyebrow) modalEyebrow.textContent = modalEyebrowText;
		applyLocalizedElements(langConfig);
		setMeta('description', descriptionText);
		setMeta('property', 'og:title', titleText);
		setMeta('property', 'og:description', descriptionText);
		setMeta('property', 'og:image', shareImage);
		setMeta('name', 'twitter:title', titleText);
		setMeta('name', 'twitter:description', descriptionText);
		setMeta('name', 'twitter:image', shareImage);
		setMeta('property', 'og:url', canonicalUrl);
		setMeta('name', 'robots', shouldNoindex() ? 'noindex' : (donationConfig.seo && donationConfig.seo.robots) || 'index,follow');
		setCanonical(canonicalUrl);
	}

	function setMeta(attr, key, content) {
		if (attr === 'description') {
			content = key;
		}

		var selector = attr === 'property' ? 'meta[property="' + key + '"]' : 'meta[name="' + key + '"]';
		var meta = attr === 'description' ? document.querySelector('meta[name="description"]') : document.querySelector(selector);

		if (!meta) return;

		meta.setAttribute('content', content || '');
	}

	function setCanonical(href) {
		var link = document.querySelector('link[rel="canonical"]');

		if (!link) return;

		link.setAttribute('href', href || '');
	}

	function applyDisplayMode() {
		var mode = getMode();
		var styleName = getStyleName();
		var sizeName = getSizeName();
		var layoutName = getLayoutName();
		var accentRgb = hexToRgb(donationConfig.theme && donationConfig.theme.accent);

		if (accentRgb) {
			document.documentElement.style.setProperty('--focus-rgb', accentRgb);
			document.documentElement.style.setProperty('--accent-rgb', accentRgb);
		}

		body.classList.toggle('is-compact', mode === 'compact');
		body.classList.toggle('is-full', mode === 'full');
		body.classList.toggle('is-card', mode === 'card');
		body.classList.toggle('is-minimal', styleName === 'minimal');
		body.classList.toggle('is-mono', styleName === 'mono');
		body.classList.toggle('layout-vertical', layoutName === 'vertical');
		body.classList.toggle('has-motion-off', !getMotionEnabled());
		body.classList.remove('size-sm', 'size-md', 'size-lg');
		body.classList.add('size-' + sizeName);
	}

	function getPreferredTheme() {
		var theme = getParam('theme').toLowerCase();
		if (theme === 'dark' || theme === 'light') return theme;

		try {
			return localStorage.getItem(themeStorageKey) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		} catch (error) {
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
	}

	function applyTheme(theme) {
		var nextTheme = theme === 'dark' ? 'dark' : 'light';
		var themeLabel = themeToggle ? themeToggle.querySelector('.theme-toggle__label') : null;
		var langConfig = i18n[activeLang] || i18n['zh-CN'];

		document.documentElement.dataset.theme = nextTheme;
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', nextTheme === 'dark' ? 'true' : 'false');
			if (themeLabel) {
				themeLabel.textContent = langConfig.themeLabels[nextTheme];
			}
		}

		if (!getParam('theme')) {
			try {
				localStorage.setItem(themeStorageKey, nextTheme);
			} catch (error) {
			}
		}
	}

	function getContentHeight() {
		var rootHeight = Math.ceil(document.documentElement.scrollHeight);
		var bodyHeight = Math.ceil(body.scrollHeight);
		return Math.max(rootHeight, bodyHeight);
	}

	function getModalHeight() {
		if (!overlay.classList.contains('is-open')) return 0;

		var cardRect = card.getBoundingClientRect();
		return Math.ceil(cardRect.height + 48);
	}

	function getParentOrigin() {
		var configuredOrigin = donationConfig.security && donationConfig.security.parentOrigin;

		if (typeof configuredOrigin === 'string' && isHttpsUrl(configuredOrigin)) {
			return new URL(configuredOrigin).origin;
		}
		try {
			return document.referrer ? new URL(document.referrer).origin : window.location.origin;
		} catch (error) {
			return window.location.origin;
		}
	}

	function syncEmbeddedHeight() {
		if (!isEmbedded) return;

		var height = Math.max(40, Math.min(1000, Math.max(getContentHeight(), getModalHeight())));
		var parentOrigin = getParentOrigin();

		try {
			if (window.frameElement && window.frameElement.tagName === 'IFRAME') {
				window.frameElement.style.height = height + 'px';
			} else {
				window.parent.postMessage({ type: 'tipframe:resize', height: height }, parentOrigin);
			}
		} catch (error) {
			try {
				window.parent.postMessage({ type: 'tipframe:resize', height: height }, parentOrigin);
			} catch (postMessageError) {
			}
		}
	}

	function scheduleHeightSync() {
		window.requestAnimationFrame(syncEmbeddedHeight);
	}

	function setStatus(message) {
		if (!status) return;

		status.textContent = message || '';
		overlay.classList.toggle('has-status', Boolean(message));
	}

	function setErrorState(message) {
		var langConfig = i18n[activeLang] || i18n['zh-CN'];

		overlay.classList.add('is-error');
		setStatus(message || langConfig.modal.error);
	}

	function updatePaymentEmptyState() {
		var hasAvailableMethod = Array.prototype.some.call(methodButtons, function (button) {
			return !button.hidden && !button.disabled;
		});

		if (paymentEmpty) paymentEmpty.hidden = hasAvailableMethod;
	}

	function markQrUnavailable(button) {
		var langConfig = i18n[activeLang] || i18n['zh-CN'];
		var unavailableText = langConfig.modal.unavailable;
		var wasUnavailable;

		if (!button) return;

		wasUnavailable = button.classList.contains('is-unavailable');
		button.classList.add('is-unavailable');
		button.disabled = true;
		button.setAttribute('aria-disabled', 'true');
		button.setAttribute('title', unavailableText);
		if (!wasUnavailable && button.querySelector('.payment-label')) {
			button.querySelector('.payment-label').textContent += ' · ' + unavailableText;
		}
		updatePaymentEmptyState();
	}

	function precheckQr(button, src) {
		if (!src) {
			markQrUnavailable(button);
			return;
		}

		var checkImage = new Image();
		checkImage.onload = function () {
			updatePaymentEmptyState();
		};
		checkImage.onerror = function () {
			markQrUnavailable(button);
			scheduleHeightSync();
		};
		checkImage.src = src;
	}

	function buildEmbedCode() {
		var baseUrl = window.location.href.split('?')[0];
		var scriptUrl = new URL('./embed.js', baseUrl).toString();
		var selectedTheme = generator.querySelector('[name="embed-theme"]').value;
		var selectedType = generator.querySelector('[name="embed-type"]').value;
		var selectedSize = generator.querySelector('[name="embed-size"]').value;
		var selectedStyle = generator.querySelector('[name="embed-style"]').value;
		var selectedMethods = Array.prototype.slice.call(generator.querySelectorAll('[name="embed-methods"]:checked')).map(function (input) {
			return input.value;
		}).join(',');
		return '<div data-tipframe data-src="' + baseUrl + '" data-type="' + selectedType + '" data-theme="' + selectedTheme + '" data-size="' + selectedSize + '" data-style="' + selectedStyle + '" data-methods="' + selectedMethods + '"></div>\n<script src="' + scriptUrl + '"><\/script>';
	}

	function updateEmbedCode() {
		if (!generator || !generatorOutput) return;

		generatorOutput.value = buildEmbedCode();
	}

	function setupEmbedBuilder() {
		if (!generator) return;

		if (generatorToggle) {
			generatorToggle.addEventListener('click', function () {
				var willOpen = generator.hidden;

				generator.hidden = !willOpen;
				generatorToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
				generatorToggle.textContent = willOpen ? (i18n[activeLang] || i18n['zh-CN']).labels.hideEmbedCode : (i18n[activeLang] || i18n['zh-CN']).labels.buildEmbedCode;
				if (willOpen) {
					updateEmbedCode();
				}
				scheduleHeightSync();
			});
		}

		generator.addEventListener('change', updateEmbedCode);
		if (generatorCopy) {
			generatorCopy.addEventListener('click', function () {
				var langConfig = i18n[activeLang] || i18n['zh-CN'];
				generatorOutput.select();
				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(generatorOutput.value);
				} else {
					document.execCommand('copy');
				}
				generatorCopy.textContent = langConfig.labels.copied;
				window.setTimeout(function () {
					generatorCopy.textContent = langConfig.labels.copy;
				}, 1200);
			});
		}
		updateEmbedCode();
	}

	function openDefaultMethod() {
		var method = getOpenMethod();
		var button;

		if (!method) return;

		button = document.querySelector('[data-method="' + method + '"]');
		if (!button || button.hidden || button.disabled) return;

		window.setTimeout(function () {
			if (button.disabled) return;
			openQr(button.getAttribute('data-qr'), button.getAttribute('data-title'), button);
		}, 420);
	}

	function setBackgroundInert(isInert) {
		if (!pageShell) return;

		if (isInert) {
			backgroundAriaHidden = pageShell.getAttribute('aria-hidden');
			pageShell.inert = true;
			pageShell.setAttribute('aria-hidden', 'true');
			return;
		}

		pageShell.inert = false;
		if (backgroundAriaHidden === null) {
			pageShell.removeAttribute('aria-hidden');
		} else {
			pageShell.setAttribute('aria-hidden', backgroundAriaHidden);
		}
		backgroundAriaHidden = null;
	}

	function getDialogFocusableElements() {
		return Array.prototype.filter.call(card.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'), function (element) {
			return !element.hidden && element.getClientRects().length > 0;
		});
	}

	function restoreFocus() {
		var target = lastTrigger && lastTrigger.isConnected && !lastTrigger.disabled && !lastTrigger.hidden ? lastTrigger : focusBeforeModal;

		if (target && target.isConnected && typeof target.focus === 'function') {
			target.focus();
		}
		lastTrigger = null;
		focusBeforeModal = null;
	}

	function openQr(src, label, trigger) {
		var langConfig = i18n[activeLang] || i18n['zh-CN'];
		var methodLabel = label || langConfig.labels.qrCode;

		if (!src) return;
		window.clearTimeout(closeTimer);
		focusBeforeModal = document.activeElement && !overlay.contains(document.activeElement) ? document.activeElement : null;
		lastTrigger = trigger || null;
		image.alt = methodLabel + ' ' + langConfig.labels.qrCode;
		title.textContent = methodLabel;
		card.style.transition = '';
		card.style.transform = '';
		overlay.classList.remove('is-closing');
		overlay.classList.remove('is-error');
		overlay.classList.add('is-loading');
		overlay.classList.add('is-open');
		overlay.setAttribute('aria-hidden', 'false');
		setStatus('');
		image.removeAttribute('src');
		image.src = src;
		if (image.complete) {
			overlay.classList.remove('is-loading');
		}
		body.style.overflow = 'hidden';
		setBackgroundInert(true);
		window.requestAnimationFrame(function () {
			window.setTimeout(function () {
				if (overlay.classList.contains('is-open')) closeButton.focus();
			}, 50);
		});
		announce(interpolate(langConfig.labels.qrOpening, { method: methodLabel }));
		scheduleHeightSync();
	}

	function triggerPressFeedback(button) {
		if (!button) return;

		button.classList.remove('is-pressing');
		void button.offsetWidth;
		button.classList.add('is-pressing');
		window.setTimeout(function () {
			button.classList.remove('is-pressing');
		}, 520);

		if (navigator.vibrate) {
			navigator.vibrate(12);
		}
	}

	function closeQr() {
		if (!overlay.classList.contains('is-open')) return;

		window.clearTimeout(closeTimer);
		overlay.classList.remove('is-loading');
		overlay.classList.remove('is-error');
		overlay.classList.add('is-closing');
		overlay.classList.remove('is-open');
		overlay.setAttribute('aria-hidden', 'true');
		card.style.transition = '';
		card.style.transform = '';
		closeTimer = window.setTimeout(function () {
			overlay.classList.remove('is-closing');
			body.style.overflow = '';
			setBackgroundInert(false);
			restoreFocus();
			announce((i18n[activeLang] || i18n['zh-CN']).labels.qrClosed);
			scheduleHeightSync();
		}, 220);
	}

	activeLang = getLanguage();
	activeMethods = parseMethods();
	applyCopy();
	applyDisplayMode();
	applyMethodOrder();
	applyTheme(getPreferredTheme());
	setupEmbedBuilder();

	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
		});
	}

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];
		var brandRgb;

		if (!config || activeMethods.indexOf(method) === -1) {
			button.hidden = true;
			button.setAttribute('aria-hidden', 'true');
			return;
		}

		button.hidden = false;
		button.removeAttribute('aria-hidden');

		button.setAttribute('aria-label', config.ariaLabel);
		if (config.icon) {
			button.style.setProperty('--payment-icon', 'url("' + config.icon.replace(/"/g, '%22') + '")');
		}
		if (config.color) {
			brandRgb = hexToRgb(config.color);
			if (brandRgb) {
				button.style.setProperty('--brand-rgb', brandRgb);
				button.style.color = config.color;
			}
		}
		if (button.querySelector('.payment-label')) {
			button.querySelector('.payment-label').textContent = config.label;
		}

		if (config.kind === 'link') {
			button.setAttribute('href', config.href);
		} else {
			button.setAttribute('data-qr', config.qr);
			button.setAttribute('data-title', config.title);
			precheckQr(button, config.qr);
		}
	});
	updatePaymentEmptyState();

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];

		if (!config || config.kind !== 'qr') return;

		button.addEventListener('click', function () {
			triggerPressFeedback(button);
			openQr(button.getAttribute('data-qr'), button.getAttribute('data-title'), button);
		});
	});

	methodButtons.forEach(function (button) {
		var method = button.getAttribute('data-method');
		var config = donationConfig.payments[method];

		if (!config || config.kind !== 'link') return;

		button.addEventListener('click', function () {
			triggerPressFeedback(button);
			scheduleHeightSync();
		});
	});

	if (window.ResizeObserver) {
		resizeObserver = new ResizeObserver(function () {
			scheduleHeightSync();
		});
		resizeObserver.observe(document.body);
		resizeObserver.observe(card);
	}

	window.addEventListener('resize', scheduleHeightSync);
	window.addEventListener('load', scheduleHeightSync);
	window.addEventListener('load', openDefaultMethod);
	window.addEventListener('message', function (event) {
		if (!event || !event.data || event.data.type !== 'tipframe:request-resize') return;
		if (event.source !== window.parent || event.origin !== getParentOrigin()) return;
		scheduleHeightSync();
	});

	overlay.addEventListener('click', function (event) {
		if (event.target === overlay || event.target.classList.contains('qr-modal__backdrop')) {
			closeQr();
		}
	});

	closeButton.addEventListener('click', closeQr);
	image.addEventListener('load', function () {
		var langConfig = i18n[activeLang] || i18n['zh-CN'];

		overlay.classList.remove('is-loading');
		overlay.classList.remove('is-error');
		setStatus('');
		announce(interpolate(langConfig.labels.qrLoaded, { method: title.textContent }));
		scheduleHeightSync();
	});
	image.addEventListener('error', function () {
		overlay.classList.remove('is-loading');
		setErrorState();
		announce(status ? status.textContent : '');
		scheduleHeightSync();
	});

	document.addEventListener('keydown', function (event) {
		var focusable;

		if (!overlay.classList.contains('is-open')) return;
		if (event.key === 'Escape') {
			closeQr();
			return;
		}
		if (event.key !== 'Tab') return;

		focusable = getDialogFocusableElements();
		if (!focusable.length) {
			event.preventDefault();
			card.focus();
			return;
		}
		if (event.shiftKey && document.activeElement === focusable[0]) {
			event.preventDefault();
			focusable[focusable.length - 1].focus();
		} else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
			event.preventDefault();
			focusable[0].focus();
		} else if (focusable.indexOf(document.activeElement) === -1) {
			event.preventDefault();
			(focusable[event.shiftKey ? focusable.length - 1 : 0]).focus();
		}
	});

	scheduleHeightSync();
});
