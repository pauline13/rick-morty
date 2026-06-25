import { expect, test } from '@playwright/test';

const inputStories = [
  { storyId: 'shared-components-input--default', screenshotName: 'default.png' },
  {
    storyId: 'shared-components-input--underline',
    screenshotName: 'underline.png'
  },
  {
    storyId: 'shared-components-input--with-right-icon',
    screenshotName: 'with-right-icon.png'
  },
  {
    storyId: 'shared-components-input--placeholder',
    screenshotName: 'placeholder.png'
  }
] as const;

for (const { storyId, screenshotName } of inputStories) {
  test(`Input ${storyId} is correct`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
    await page.waitForLoadState('networkidle');

    const root = page.locator('#storybook-root');

    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot(['__screenshots__', screenshotName]);
  });
}
