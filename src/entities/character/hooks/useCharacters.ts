import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { isRequestCanceled } from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';

import { getCharacters } from '../api';
import type { Character, CharactersFilters } from '../model';

export const useCharacters = (filters: CharactersFilters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedName = useDebounce(filters.name);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      try {
        setLoading(true);

        const data = await getCharacters(
          {
            ...filters,
            name: debouncedName
          },
          controller.signal
        );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName, filters.status, filters.species, filters.gender]);

  return {
    characters,
    loading
  };
};
