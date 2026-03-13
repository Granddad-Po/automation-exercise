import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Expect a title "to contain" a substring.
  await expect(
    page.getByRole('img', { name: 'Website for automation practice' }),
  ).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
});
