import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/tr");
  await expect(page).toHaveURL(/\/tr$/);
  await expect(page.locator("body")).toBeVisible();
});
