import { apiInstance } from '@/shared/api';
import { API_ROUTES } from '@/shared/constants';
import { normalizeStatus } from '@/shared/helpers';

import type { Character, CharactersFilters } from '../model';

type CharactersResponse = {
  info: {
    next: string | null;
  };
  results: Character[];
};

export const getCharacters = async (
  filters: CharactersFilters & { page: number },
  signal?: AbortSignal
): Promise<CharactersResponse> => {
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

  return {
    info: data.info,
    results: data.results.map((character) => ({
      ...character,
      status: normalizeStatus(character.status)
    }))
  };
};
