import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/My Portfolio/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');

    // Click the get started link.
    await page.getByRole('link', { name: 'View My Work' }).click();

    // Expects page to have a heading with the name of Projects.
    await expect(page.locator('#projects')).toBeVisible();
});
