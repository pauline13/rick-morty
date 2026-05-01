import { useEffect, useState } from 'react';

import { handleRequestError } from '@/shared/helpers';

import { getCharacter } from '../api';
import type { Character } from '../model';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      try {
        setLoading(true);

        const data = await getCharacter(id, controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        const errorType = handleRequestError(error, {
          unknown: 'Failed to load character',
          network: 'Failed to load character. Check your internet connection',
          server: 'Failed to load character. Please try again later'
        });

        if (errorType === 'canceled') return;

        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    character,
    loading
  };
};
