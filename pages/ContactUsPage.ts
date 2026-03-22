import { expect, Locator, Page } from '@playwright/test';
import { Contact } from '../types/contact';

export class ContacUsPage {
  readonly getInTouchTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly successSubmitText: Locator;
  readonly goHomeLink: Locator;

  constructor(private page: Page) {
    this.getInTouchTitle = this.page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = this.page.getByTestId('name');
    this.emailInput = this.page.getByTestId('email');
    this.subjectInput = this.page.getByTestId('subject');
    this.messageInput = this.page.getByTestId('message');
    this.fileInput = this.page.locator('input[name="upload_file"]');
    this.submitButton = this.page.getByTestId('submit-button');
    this.successSubmitText = this.page.getByText(
      'Success! Your details have been submitted successfully.',
    );
    this.goHomeLink = this.page.getByRole('link', { name: 'Home' });
  }

  async verifyContactUsPageVisible() {
    await expect(this.getInTouchTitle).toBeVisible();
  }

  async fillContactUsForm(contact: Contact) {
    await this.nameInput.fill(contact.name);
    await this.emailInput.fill(contact.email);
    await this.subjectInput.fill(contact.subject);
    await this.messageInput.fill(contact.message);
  }
}
