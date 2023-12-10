import { test, expect } from "@playwright/test";

test(" User login", async ({ page }) => {
  
  await page.goto('http://localhost:3000/?tablenumber=5');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill('Admin');
  await page.getByPlaceholder('UserName').press('Tab');
  await page.getByPlaceholder('Password').fill('Pa$$w0rd');
  await page.getByRole('button', { name: 'Login' }).click();
});
test("menu list", async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill('MH');
  await page.getByPlaceholder('UserName').press('Tab');
  await page.getByPlaceholder('Password').fill('Pa$$w0rd');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Gå til forsiden' }).click();
  await page.getByRole('link', { name: 'Menu' }).click();
});

test("Register User", async ({ page }) => {
  await page.goto('http://localhost:3000/?tablenumber=5');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('TESTUSER');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('firstname').fill('test');
  await page.getByPlaceholder('firstname').press('Tab');
  await page.getByPlaceholder('lastName').fill('tee');
  await page.getByPlaceholder('lastName').press('Tab');
  await page.getByPlaceholder('adresse').fill('testvej');
  await page.getByPlaceholder('adresse').press('Tab');
  await page.getByPlaceholder('city').fill('testby');
  await page.getByPlaceholder('city').press('Tab');
  await page.getByPlaceholder('zipCode').fill('2222');
  await page.getByPlaceholder('zipCode').press('Tab');
  await page.getByPlaceholder('country').fill('DK');
  await page.getByPlaceholder('birthDate').fill('2023-11-27');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('PAssw0rd!');
  await page.getByRole('button', { name: 'Register' }).click();

  });
  test(" See menulist and Add Product to basket", async ({ page }) => {

    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('MH');
    await page.getByPlaceholder('UserName').press('Tab');
    await page.getByPlaceholder('Password').fill('Pa$$w0rd');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByRole('button', { name: 'Gå til forsiden' }).click();
    await page.getByRole('link', { name: 'Menu' }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button').nth(2).dblclick();
    await page.getByRole('button', { name: '' }).click();
    });
 