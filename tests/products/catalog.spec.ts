import { test } from '../../fixtures/test';

test.describe('Catalog', () => {
  test('Verify All Products and product detail page', async ({ app, homePage }) => {
    await app.main.expectMainPageVisible();
    await app.header.openProductsPage();
    await app.product.expectProductsPageVisible();
    await app.product.expectProductsListVisible();

    await app.product.openProductCard('Blue Top');
    await app.product.expectProductDetailsPageVisible('Blue Top');
    await app.product.expectAllProductDetailsVisible();
  });
});
