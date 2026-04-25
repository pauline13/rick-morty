import { apiInstance } from '@/shared/api';
import { API_ROUTES } from '@/shared/constants';
import { normalizeStatus } from '@/shared/helpers';

import type { Character, CharactersFilters } from '../model';

type CharactersResponse = {
  results: Character[];
};

export const getCharacters = async (
  filters: CharactersFilters,
  signal?: AbortSignal
): Promise<Character[]> => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v)
  );

  const { data } = await apiInstance.get<CharactersResponse>(
    API_ROUTES.characters,
    {
      signal,
      timeout: 10000,
      params
    }
  );

  return data.results.map((character) => ({
    ...character,
    status: normalizeStatus(character.status)
  }));
};
