const { test, expect } = require('@playwright/test');
test("1, the main page has a header 'Lists'", async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h4')).toHaveText('Lists');
});
test("2, the main page has a title 'Shared shopping lists'", async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Shared shopping lists');
});

test("3, the lists.eta has h4 'Add a new shopping list'", async ({ page }) => {
  await page.goto('/lists');
  await expect(page.locator('h4')).toHaveText([
    'Add a new shopping list',
    'Shopping lists',
    'Main page',
  ]);
});
test("4, the lists.eta has an a 'Input with value = add list'", async ({
  page,
}) => {
  await page.goto('/lists');
  const taskName = `Name: ${Math.random()}`;
  await page.locator('input[type=text]').type(taskName);
  await page.locator("input[type=submit][value='Add list']").click();
  await expect(page.locator(`a >> text='${taskName}'`)).toHaveText(taskName);
});
test('Can deactivate a shopping list', async ({ page }) => {
  const name = 'My first list';
  await page.goto('/lists');
  await page.click('input[value = "Deactivate list!"]');
  await expect(page.locator(`a >> text='${name}'`)).not.toBeVisible();
}); 

