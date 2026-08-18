const { test, expect } = require('@playwright/test');

test('default page renders without QR preloads', async ({ page }) => {
  await page.goto('/?lang=zh-CN');
  await expect(page.locator('h1')).toHaveText('如果这个项目帮到了你');
  await expect(page.locator('[data-method="paypal"]')).toBeVisible();
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(0);
});

test('English interface uses localized copy throughout', async ({ page }) => {
  await page.goto('/?lang=en');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('If this project helped you');
  await expect(page.locator('.page-copy p:last-child')).toHaveText('You can support ongoing maintenance in your preferred way.');
  await expect(page.locator('.theme-toggle')).toHaveAccessibleName('Toggle color theme');
  await expect(page.locator('.theme-toggle__label')).toHaveText('Dark mode');
  await expect(page.locator('.support-card__label p')).toHaveText('Choose a payment method');
  await expect(page.locator('.payment-grid')).toHaveAccessibleName('Payment methods');
  await expect(page.locator('.support-card__footnote')).toHaveText('Continue securely or scan a QR code to pay');
  await expect(page.locator('.payment-empty')).toHaveText('No payment methods are currently available.');
  await expect(page.locator('.embed-builder-toggle')).toHaveText('Generate embed code');

  await page.locator('.embed-builder-toggle').click();
  await expect(page.locator('.embed-builder h2')).toHaveText('Generate embed code');
  await expect(page.locator('label').filter({ hasText: 'Theme' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Mode' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Style' })).toBeVisible();
  await expect(page.locator('label').filter({ hasText: 'Size' })).toBeVisible();
  await expect(page.locator('.embed-builder legend')).toHaveText('Payment methods');
  await expect(page.locator('.embed-builder__copy')).toHaveText('Copy code');

  await page.locator('[data-method="wechat"]').click();
  await expect(page.locator('.qr-modal')).toHaveAccessibleName('QR code dialog');
  await expect(page.locator('.qr-modal__eyebrow')).toHaveText('Scan to support');
  await expect(page.locator('.qr-modal__hint')).toContainText('Right click to save the QR code');
  await expect(page.locator('.qr-modal__caption')).toHaveText('Click outside or press Esc to close');
  await expect(page.locator('.qr-modal__close')).toHaveAccessibleName('Close QR code');
  await page.keyboard.press('Escape');
});

test('QR dialog traps focus and restores it after Escape', async ({ page }) => {
  await page.goto('/?lang=en');

  const trigger = page.locator('[data-method="wechat"]');
  const closeButton = page.locator('.qr-modal__close');
  await trigger.focus();
  await trigger.click();
  await expect(page.locator('.qr-modal')).toHaveClass(/is-open/);
  await expect(closeButton).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(closeButton).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(page.locator('.qr-modal')).toHaveAttribute('aria-hidden', 'true');
  await expect(trigger).toBeFocused({ timeout: 1000 });
});

test('profile entry uses profile-specific content', async ({ page }) => {
  await page.goto('/profiles/projectA/');
  await expect(page).toHaveTitle('支持 Project A');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', '支持 Project A');
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('h1')).toHaveText('支持 Project A');
});

test('profile directory links to public entries', async ({ page }) => {
  await page.goto('/profiles/');
  await expect(page.locator('h1')).toHaveText('选择一个支持页面');
  await expect(page.locator('a[href="./projectA/"]')).toBeVisible();
  await expect(page.locator('a[href="./projectB/"]')).toBeVisible();
});

test('diagnostic profiles preserve their configured states', async ({ page }) => {
  await page.goto('/profiles/brokenQr/');
  const brokenQrFrame = page.frameLocator('iframe');
  await expect(brokenQrFrame.locator('[data-method="wechat"]')).toBeDisabled();

  await page.goto('/?profile=lockedDemo&title=覆盖文案&methods=paypal');
  await expect(page.locator('h1')).toHaveText('URL 覆盖禁用演示');
  await expect(page.locator('[data-method="paypal"]')).toBeHidden();
});

test('shows an empty state when every payment method is unavailable', async ({ page }) => {
  await page.route('**/config.js', async (route) => {
    await route.fulfill({
      contentType: 'application/javascript',
      body: `window.TipFrameConfig = {
        display: { methods: ['paypal', 'alipay', 'wechat'] },
        payments: {
          paypal: { enabled: false },
          alipay: { enabled: false },
          wechat: { enabled: false }
        }
      };`
    });
  });

  await page.goto('/?lang=en');
  await expect(page.locator('[data-method]')).toHaveCount(3);
  await expect(page.locator('[data-method]:visible')).toHaveCount(0);
  await expect(page.locator('.payment-empty')).toBeVisible();
  await expect(page.locator('.payment-empty')).toHaveText('No payment methods are currently available.');
});

test('rejects invalid payment, profile, and text configuration', async ({ page }) => {
  const warnings = [];
  page.on('console', (message) => {
    if (message.type() === 'warning') warnings.push(message.text());
  });
  await page.route('**/config.js', async (route) => {
    await route.fulfill({
      contentType: 'application/javascript',
      body: `window.TipFrameConfig = {
        page: { title: '${'x'.repeat(301)}' },
        display: { methods: ['paypal'] },
        payments: { paypal: { kind: 'link', href: 'javascript:alert(1)' } }
      };`
    });
  });

  await page.goto('/?profile=../../unknown');
  await expect(page.locator('h1')).toHaveText('如果这个项目帮到了你');
  await expect(page.locator('[data-method="paypal"]')).toBeHidden();
  await expect.poll(() => warnings).toEqual(expect.arrayContaining([
    '[TipFrame] Profile "../../unknown" does not exist.',
    '[TipFrame] payments.paypal.href must use HTTPS.',
    '[TipFrame] i18n.zh-CN.page.title must be a non-empty string up to 300 characters.'
  ]));
});

test('embed height messages require the expected origin, source, and bounds', async ({ page }) => {
  await page.goto('/');
  await page.setContent('<div data-tipframe data-src="/index.html"></div>');
  await page.addScriptTag({ url: '/embed.js' });

  const iframe = page.locator('[data-tipframe] iframe');
  await expect(iframe).toBeAttached();
  await expect(iframe).toHaveAttribute('src', /index\.html.*embed=1/);
  const initialHeight = await iframe.evaluate((element) => element.style.height);

  async function dispatchResize(message) {
    await page.evaluate((event) => {
      const iframeElement = document.querySelector('[data-tipframe] iframe');
      window.dispatchEvent(new MessageEvent('message', {
        data: event.data,
        origin: event.origin,
        source: event.source === 'iframe' ? iframeElement.contentWindow : window
      }));
    }, message);
  }

  const origin = new URL(page.url()).origin;
  await dispatchResize({ data: { type: 'tipframe:resize', height: 180 }, origin: 'https://untrusted.example', source: 'iframe' });
  await dispatchResize({ data: { type: 'tipframe:resize', height: 180 }, origin, source: 'page' });
  await dispatchResize({ data: { type: 'tipframe:resize', height: 39 }, origin, source: 'iframe' });
  await dispatchResize({ data: { type: 'tipframe:resize', height: 1001 }, origin, source: 'iframe' });
  await expect.poll(() => iframe.evaluate((element) => element.style.height)).toBe(initialHeight);

  await dispatchResize({ data: { type: 'tipframe:resize', height: 180.2 }, origin, source: 'iframe' });
  await expect.poll(() => iframe.evaluate((element) => element.style.height)).toBe('181px');
});

test.describe('mobile dark mode', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    colorScheme: 'dark',
    isMobile: true
  });

  test('keeps the card within the mobile viewport and applies the dark theme', async ({ page }) => {
    await page.goto('/?lang=en');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(11, 18, 32)');
    await expect(page.locator('.support-card')).toHaveCSS('grid-template-columns', /\d+px/);
    await expect(page.locator('.theme-toggle__label')).toBeHidden();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
