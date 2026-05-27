import { expect, test, type Route } from '@playwright/test';

import { CHARACTERS_API_URL, TEST_IDS } from './constants';
import { charactersListResponseMock } from './fixtures/charactersListResponseMock';

const EXPECTED_CHARACTERS_COUNT = charactersListResponseMock.results.length;

test.describe('Characters list', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(CHARACTERS_API_URL, (route: Route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(charactersListResponseMock)
      });
    });

    await page.goto('/');
  });

  test('should display all characters from the fixture', async ({ page }) => {
    const charactersList = page.getByTestId(TEST_IDS.charactersList);

    await expect(charactersList.getByRole('listitem')).toHaveCount(
      EXPECTED_CHARACTERS_COUNT
    );
  });

  test('should display character names matching the fixture', async ({
    page
  }) => {
    const charactersList = page.getByTestId(TEST_IDS.charactersList);

    for (const character of charactersListResponseMock.results) {
      await expect(
        charactersList.getByRole('listitem').filter({ hasText: character.name })
      ).toBeVisible();
    }
  });
});
