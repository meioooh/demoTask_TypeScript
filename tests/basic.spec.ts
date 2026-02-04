import { test, expect } from '@playwright/test';

//  выполняется перед каждым отдельным тестом
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
}); 

// группирование тестов по общему признаку
test.describe('Simple UI tests', () => {

test('Page title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1.heading')).toContainText('the-internet'); // ожидаем, что в заголовке страницы есть текст 'the-internet'
});

test('Navigation', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Form Authentication'}).click(); // переходим по ссылке form authentication
    await page.waitForURL('/login'); // дождались полной загрузки страницы '/login'
    await expect(page).toHaveURL('/login')
    await expect(page.locator('h2')).toContainText('Login Page'); // страница содержит текст 'Login Page'
});

test('Login', async ({ page }) => {
    await page.goto('/login');

    // вводим логин и пароль
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith'); 
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    
    // жмем логин и дожидаемся загрузки следующей страницы
    await page.locator('button:has-text("Login")').click();
    await page.waitForURL('/secure');

    await expect(page.locator('div#flash.flash.success')).toBeVisible(); // видно сообщение об успехе
    await expect(page.locator('div#flash.flash.success')).toContainText('You logged into a secure area!'); // ожидаемый текст внутри сообщения
});
 
test('Hover cursor', async ({ page }) => {
    // 1. Open page https://the-internet.herokuapp.com/hovers
    await page.goto('/hovers');

    // 2–4. Hover each avatar and check "View profile" text
    const figures = page.locator('.figure');
    const count = await figures.count();

    for (let i = 0; i < count; i++) {
        const figure = figures.nth(i);

        // 2. Hover cursor over avatar
        await figure.locator('img').hover();

        // 3. Check if user has text "View profile"
        await expect(figure.getByRole('link', { name: 'View profile' })).toBeVisible();
    }
});

});