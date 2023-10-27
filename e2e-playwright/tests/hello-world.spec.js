const { test, expect } = require("@playwright/test");
test("1, the main page has a header 'Lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h4")).toHaveText("Lists");
});
test("2, the main page has a title 'Shared shopping lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
});

test("3, the lists.eta has h4 'Add a new shopping list'", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("h4")).toHaveText(["Add a new shopping list","Shopping lists", "Main page"]);
});
test("4, the lists.eta has an a 'Input with value = add list'", async ({ page }) => {
  await page.goto("/lists");
  const taskName = `Name: ${Math.random()}`;
  await page.locator("input[type=text]").type(taskName);
  await page.locator( "input[type=submit][value='Add list']").click();
  await expect(page.locator(`a >> text='${taskName}'`)).toHaveText(taskName);
});
/* test("5, the singleList.eta has an a 'Input with value = add item'", async ({ page }) => {
  const id = `${Math.trunc(Math.random())}`
  console.log("<<<<",id)
  await page.goto(`/lists/${id}`);
  const input = `Name: ${Math.random()}`;
  console.log("11111", input)
  await page.locator( "input[type=submit][value='Add item']").click()
  await page.goto(`/lists/${id}/items`);
  await expect(page.locator(`ul >> text='${input}'`)).toHaveText(input); 
}); */
const name = "My first list";
test("Can deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.click('input[value = "Deactivate list!"]');
  await expect(page.locator(`a >> text='${name}'`)).not.toBeVisible();
});
/* 
const { test, expect } = require("@playwright/test");
 
const name = "My first list";
 
test("Can create a new shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.type("input[name=name]", name);
  await page.click("input[type=submit]");
  await expect(page.locator(`a >> text='${name}'`)).toHaveText(name);
});
 
test("Can open a shopping list page", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await expect(page.locator("h1")).toHaveText(name);
});
 
const item = "Milk";
 
test("Can add an item to a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await page.type("input[name=name]", item);
  await page.click("input[type=submit]");
  await expect(page.locator(`td >> text='${item}'`)).toHaveText(item);
});
 
test("Can mark an item as collected", async ({ page }) => {
  await page.goto("/lists");
  await page.click(`a >> text='${name}'`);
  await page.click('input[value = "Mark collected!"]');
  await expect(page.locator(`td >> text='${item}'`)).toHaveText(item);
});
 this is my testing file
 
 
test("Can deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.click('input[value = "Deactivate list!"]');
  await expect(page.locator(`a >> text='${name}'`)).not.toBeVisible();
});
 
*/