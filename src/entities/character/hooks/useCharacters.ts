import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getCharacters } from '@/entities/character/api';
import type { Character } from '@/entities/character/model';
import { isRequestCanceled } from '@/shared/helpers';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      try {
        setLoading(true);

        const data = await getCharacters(controller.signal);
        setCharacters(data);
      } catch (error: unknown) {
        if (isRequestCanceled(error)) return;

        toast.error('Failed to load characters');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    characters,
    loading
  };
};
