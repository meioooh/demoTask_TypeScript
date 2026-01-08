import { test, expect } from '@playwright/test';

// группирование тестов по общему признаку
test.describe('Test for containing some text on web-page', () => {

test('Page title', async ({ page }) => {
    // переход на страницу по указанному URL
    await page.goto('/');

    // ожидаем, что в заголовке страницы есть текст 'the-internet'
    const h1Locator = page.locator('h1.heading');
    await expect(h1Locator).toContainText('the-internet');
});

test('Navigation', async ({ page }) => {
    
    await page.goto('/');
});

});