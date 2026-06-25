import { expect, test } from '@playwright/test';

const selectStories = [
  { storyId: 'shared-components-select--default', screenshotName: 'default.png' },
  { storyId: 'shared-components-select--small', screenshotName: 'small.png' },
  {
    storyId: 'shared-components-select--placeholder',
    screenshotName: 'placeholder.png'
  },
  {
    storyId: 'shared-components-select--with-suffix',
    screenshotName: 'with-suffix.png'
  }
] as const;

for (const { storyId, screenshotName } of selectStories) {
  test(`Select ${storyId} is correct`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
    await page.waitForLoadState('networkidle');

    const root = page.locator('#storybook-root');

    await expect(root).toBeVisible();
    await expect(root).toHaveScreenshot(['__screenshots__', screenshotName]);
  });
}
