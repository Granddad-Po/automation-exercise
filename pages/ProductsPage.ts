import { Locator, Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly allProductTitle: Locator;
  readonly productCardList: Locator;

  constructor(private page: Page) {
    this.allProductTitle = this.page.getByRole('heading', { name: 'All Products' });
    this.productCardList = this.page.getByText('All Products');
  }

  productCard(productName: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
  productTitle(productName: string): Locator {
    return this.page.getByRole('heading', { name: productName });
  }

  async expectProductsPageVisible() {
    await expect(this.allProductTitle).toBeVisible();
  }
  async expectProductsListVisible() {
    await expect(this.productCardList).toBeVisible();
  }
  async expectProductDetailsPageVisible(productName: string) {
    await expect(this.page).toHaveURL(/\/product_details\/\d+$/);
    await expect(this.productTitle(productName)).toBeVisible();
  }
  async expectAllProductDetailsVisible() {
    await expect(this.page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(this.page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(this.page.getByText('Rs.')).toBeVisible();
    await expect(this.page.getByText('Availability: In Stock')).toBeVisible();
    await expect(this.page.getByText('Condition: New')).toBeVisible();
    await expect(this.page.getByText('Brand: Polo')).toBeVisible();
  }

  async openProductCard(productName: string) {
    await this.productCard(productName).getByRole('link', { name: 'View Product' }).click();
  }
}
