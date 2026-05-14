import { useCallback, useEffect, useRef, useState } from 'react';

import {
  createErrorMessages,
  getRequestErrorType,
  handleRequestError,
  REQUEST_ERROR_TYPE
} from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';

import { getCharacters } from '../api';
import type { Character, CharactersFilters } from '../model';

const CHARACTERS_ERROR_MESSAGES = createErrorMessages('characters');
const RETRY_DELAY = 3000;
const MAX_RETRIES = 3;

export const useCharacters = (filters: CharactersFilters) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [retryTrigger, setRetryTrigger] = useState(0);
  const retryCountRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const debouncedName = useDebounce(filters.name);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
    setHasMore(true);
    setHasError(false);
    retryCountRef.current = 0;
  }, [debouncedName, filters.status, filters.species, filters.gender]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const fetchCharacters = async () => {
      try {
        setHasError(false);

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

        retryCountRef.current = 0;

        setCharacters((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );

        setHasMore(Boolean(data.info.next));
        setIsLoading(false);
        setIsLoadingMore(false);
      } catch (error: unknown) {
        const errorType = getRequestErrorType(error);

        if (errorType === REQUEST_ERROR_TYPE.CANCELED) return;
        
        if (errorType === REQUEST_ERROR_TYPE.NOT_FOUND) {
          setHasMore(false);
          setIsLoading(false);
          setIsLoadingMore(false);
          return;
        }

        const isRetryableError =
          errorType === REQUEST_ERROR_TYPE.NETWORK ||
          errorType === REQUEST_ERROR_TYPE.SERVER ||
          errorType === REQUEST_ERROR_TYPE.RATE_LIMITED;

        if (
          isRetryableError &&
          retryCountRef.current < MAX_RETRIES &&
          !cancelled
        ) {
          retryCountRef.current += 1;
          retryTimerRef.current = setTimeout(fetchCharacters, RETRY_DELAY);
          return;
        }

        handleRequestError(error, CHARACTERS_ERROR_MESSAGES);
        setHasError(true);
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchCharacters();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(retryTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, retryTrigger, debouncedName, filters.status, filters.species, filters.gender]);

  const retry = useCallback(() => {
    retryCountRef.current = 0;
    setRetryTrigger((prev) => prev + 1);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || hasError) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isLoadingMore, hasError]);

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
    hasError,
    loadMore,
    retry,
    updateCharacter
  };
};
