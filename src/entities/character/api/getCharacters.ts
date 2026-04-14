import { apiInstance } from '@/shared/api';
import { normalizeStatus } from '@/shared/helpers';

import type { Character } from '../model';

type CharactersResponse = {
  results: Character[];
};

export const getCharacters = async (
  signal?: AbortSignal
): Promise<Character[]> => {
  const { data } = await apiInstance.get<CharactersResponse>('/character', {
    signal,
    timeout: 10000
  });

  return data.results.map((character) => ({
    ...character,
    status: normalizeStatus(character.status)
  }));
};
