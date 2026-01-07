import { test, expect } from '@playwright/test';

test('Page title contains text', async ({ page }) => {
    // переход на страницу по указанному URL
    await page.goto('https://the-internet.herokuapp.com/');

    // ожидаем, что в заголовке страницы есть текст 'the-internet'
    const h1Locator = page.locator('h1.heading');
    await expect(h1Locator).toContainText('the-internet');
});