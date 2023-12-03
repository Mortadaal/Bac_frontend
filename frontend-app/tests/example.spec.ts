import { test, expect } from "@playwright/test";

test("has login", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/login");
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("UserName").click();
  await page.getByPlaceholder("UserName").fill("Admin");
  await page.getByPlaceholder("UserName").press("Tab");
  await page.getByPlaceholder("Password").fill("Pa$$w0rd");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("button", { name: "Gå til forsiden" }).click();
});
