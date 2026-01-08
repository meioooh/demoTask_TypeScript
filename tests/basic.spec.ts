import { test, expect } from '@playwright/test';

// группирование тестов по общему признаку
test.describe('Simple UI tests', () => {

test('Page title', async ({ page }) => {
    // переход на страницу по base URL
    await page.goto('/');

    const h1Locator = page.locator('h1.heading');
    await expect(h1Locator).toContainText('the-internet'); // ожидаем, что в заголовке страницы есть текст 'the-internet'
});

test('Navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Form Authentication'}).click(); // переходим по ссылке form authentication
    await page.waitForURL('**\/login'); // дождались полной загрузки страницы '/login'
    await expect(page.locator('h2')).toContainText('Login Page'); // страница содержит текст 'Login Page'
});

});