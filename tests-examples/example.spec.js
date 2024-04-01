// @ts-check
import { test, expect } from '@playwright/test';

test.only('check home page title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Hillel Qauto');
});
