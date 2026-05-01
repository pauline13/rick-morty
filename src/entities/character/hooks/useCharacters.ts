import { useCallback, useEffect, useState } from 'react';

import {
  createErrorMessages,
  handleRequestError,
  REQUEST_ERROR_TYPE
} from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';

import { getCharacters } from '../api';
import type { Character, CharactersFilters } from '../model';

const CHARACTERS_ERROR_MESSAGES = createErrorMessages('characters');

export const useCharacters = (filters: CharactersFilters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedName = useDebounce(filters.name);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedName, filters.status, filters.species, filters.gender]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      try {
        if (page === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const data = await getCharacters(
          {
            ...filters,
            name: debouncedName,
            page
          },
          controller.signal
        );

        setCharacters((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );

        setHasMore(Boolean(data.info.next));
      } catch (error: unknown) {
        const errorType = handleRequestError(error, CHARACTERS_ERROR_MESSAGES);

        if (errorType === REQUEST_ERROR_TYPE.CANCELED) return;
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchCharacters();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedName, filters.status, filters.species, filters.gender]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoadingMore]);

  const updateCharacter = useCallback((value: Character) => {
    setCharacters((prev) =>
      prev.map((character) => (character.id === value.id ? value : character))
    );
  }, []);

  return {
    characters,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    updateCharacter
  };
};
