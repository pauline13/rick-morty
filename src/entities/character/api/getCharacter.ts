import { apiInstance } from '@/shared/api';
import { normalizeStatus } from '@/shared/helpers';

import type { Character } from '../model';

export const getCharacter = async (
  id: number,
  signal?: AbortSignal
): Promise<Character> => {
  const { data } = await apiInstance.get<Character>(`/character/${id}`, {
    signal,
    timeout: 10000
  });

  return {
    ...data,
    status: normalizeStatus(data.status)
  };
};
