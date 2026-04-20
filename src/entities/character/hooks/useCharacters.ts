import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { isRequestCanceled } from '@/shared/helpers';

import { getCharacters } from '../api';
import type { Character } from '../model';

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
