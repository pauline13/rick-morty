import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData
} from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

import { FILTER_NAME_DEBOUNCE_MS } from '@/shared/constants';
import {
  createErrorMessages,
  getRequestErrorType,
  handleRequestError,
  REQUEST_ERROR_TYPE
} from '@/shared/helpers';
import { useDebounce } from '@/shared/hooks';

import { getCharacters, type CharactersResponse } from '../api';
import type { Character, CharactersFilters } from '../model';

const CHARACTERS_ERROR_MESSAGES = createErrorMessages('characters');

type CharactersInfiniteData = InfiniteData<CharactersResponse, number>;

export const useCharacters = (filters: CharactersFilters) => {
  const queryClient = useQueryClient();
  const debouncedName = useDebounce(filters.name, FILTER_NAME_DEBOUNCE_MS);

  const queryFilters = useMemo(
    () => ({
      name: debouncedName,
      status: filters.status,
      species: filters.species,
      gender: filters.gender
    }),
    [debouncedName, filters.status, filters.species, filters.gender]
  );

  const queryKey = useMemo(
    () => ['characters', queryFilters] as const,
    [queryFilters]
  );

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
    refetch: refetchQuery
  } = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getCharacters(
        { ...filters, name: debouncedName, page: pageParam },
        signal
      ).catch((requestError: unknown) => {
        if (
          getRequestErrorType(requestError) === REQUEST_ERROR_TYPE.NOT_FOUND
        ) {
          return { results: [], info: { next: null } };
        }

        throw requestError;
      }),
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.info.next ? lastPageParam + 1 : undefined
  });

  useEffect(() => {
    if (isError && !isFetching && error) {
      handleRequestError(error, CHARACTERS_ERROR_MESSAGES);
    }
  }, [isError, isFetching, error]);

  const refetch = useCallback(() => { refetchQuery(); }, [refetchQuery]);

  const characters = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );

  const updateCharacter = useCallback(
    (value: Character) => {
      queryClient.setQueryData<CharactersInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((character) =>
              character.id === value.id ? value : character
            )
          }))
        };
      });
    },
    [queryClient, queryKey]
  );

  return {
    characters,
    isLoading: isPending,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    isError,
    fetchNextPage,
    refetch,
    updateCharacter
  };
};
