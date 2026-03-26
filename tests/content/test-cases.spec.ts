import { expect, test } from '../../fixtures/test';

test.describe('Test Cases', () => {
  test('Verify Test Cases Page', async ({ app, homePage, page }) => {
    await app.main.expectMainPageVisible();
    await app.header.openTestCasesPage();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
  });
});
