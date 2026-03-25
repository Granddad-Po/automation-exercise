import { test } from '../../fixtures/test';

test.describe('Contact Us', { tag: ['@smoke', '@contact'] }, () => {
  test.skip('Contact Us Form success send data', async ({ app, homePage, contactData }) => {
    await app.main.expectMainPageVisible();
    await app.header.openContactUsPage();
    await app.contact.verifyContactUsPageVisible();
    await app.contact.fillContactUsForm(contactData);
    await app.contact.submitForm();
    await app.contact.verifySuccessTextVisible();
    await app.contact.clickHomeButton();
    await app.main.expectMainPageVisible();
  });
});
