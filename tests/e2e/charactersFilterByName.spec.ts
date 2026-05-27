import { expect, test, type Route } from '@playwright/test';

import { CHARACTERS_API_URL, TEST_IDS } from './constants';
import { charactersByNameRickResponseMock } from './fixtures/charactersByNameRickResponseMock';
import { charactersListResponseMock } from './fixtures/charactersListResponseMock';

const FILTER_SEARCH_TERM = 'Rick';

test.describe('Characters filter by name', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(CHARACTERS_API_URL, (route: Route) => {
      const url = route.request().url();

      if (url.includes('name=')) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(charactersByNameRickResponseMock)
        });
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(charactersListResponseMock)
        });
      }
    });

    await page.goto('/');
  });

  test('should filter characters by name and show only matching results', async ({
    page
  }) => {
    const filterNameInput = page.getByTestId(TEST_IDS.filterNameInput);
    const charactersList = page.getByTestId(TEST_IDS.charactersList);

    await filterNameInput.fill(FILTER_SEARCH_TERM);

    await expect(charactersList.getByRole('listitem')).toHaveCount(
      charactersByNameRickResponseMock.results.length
    );

    for (const character of charactersByNameRickResponseMock.results) {
      await expect(
        charactersList.getByRole('listitem').filter({ hasText: character.name })
      ).toBeVisible();
    }
  });
});
