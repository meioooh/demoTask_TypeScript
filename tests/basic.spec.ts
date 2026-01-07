import { test, expect } from '@playwright/test';

test('contains title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
});