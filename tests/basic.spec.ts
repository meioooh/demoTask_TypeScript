import { test, expect } from '@playwright/test';
const emailData = JSON.parse(JSON.stringify(require("../emailData.json")));

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

});


test.describe('Advanced UI tests', () => {

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
    };

    });


    test('All elements from dropdown list are visible', async ({ page }) => {

        await page.goto('/dropdown');

        // dropdown list value by Default
        const dropDownList = page.locator('#dropdown');
        await expect(dropDownList).toHaveValue('');
        
        // validating all options in dropdown list
        const dropDownListOptions = page.locator('#dropdown > option');
        await expect(dropDownListOptions).toHaveText(['Please select an option', 'Option 1', 'Option 2']);

    });

    test('Count all images on the page', async ({ page }) => {

        await page.goto('/download');
        
        const allLinks = await page.locator('a').all(); // получили все ссылки на изображения
        
        const imageExtensions = ['.jpg', '.png', '.jpeg']; // перечислили нужные форматы файлов
        let imageCount = 0;


        // проверяется и подсчитывается количество файлов с перечисленными расширениями
        for (const link of allLinks) {
            const href = await link.getAttribute('href');
            if (href) {
                const fileName = href.toLowerCase();
                if (imageExtensions.some(ext => fileName.endsWith(ext))) {
                    imageCount++;
                };
            };
        };

        // сравниваем, что подсчитанные изображения автоматически совпадают с ожидаемым результатом
        const expectedImageCount = 47;
        expect(imageCount).toBe(expectedImageCount);

    });


        test.describe('Data Driven tests', () => {

            for (const email of emailData) {
                test(`Password Recovery ${email.id}`, async ({ page }) => {

                    await page.goto('/forgot_password'); // open password recovery page
                    await page.locator('#email').fill(email.email);
                    await page.locator('#form_submit').click();
                    await expect(page.getByRole('heading', {level: 1})).toContainText('Internal Server Error');

                });
            };
        });
});