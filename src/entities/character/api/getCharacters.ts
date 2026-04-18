import { apiInstance } from '@/shared/api';
import { API_ROUTES } from '@/shared/constants';
import { normalizeStatus } from '@/shared/helpers';

import type { Character } from '../model';

type CharactersResponse = {
  results: Character[];
};

export const getCharacters = async (
  signal?: AbortSignal
): Promise<Character[]> => {
  const { data } = await apiInstance.get<CharactersResponse>(
    API_ROUTES.characters,
    {
      signal,
      timeout: 10000
    }
  );

  return data.results.map((character) => ({
    ...character,
    status: normalizeStatus(character.status)
  }));
};
