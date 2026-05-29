import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { QUERY_RETRY_DELAY_MS } from '@/shared/constants';
import {
  createErrorMessages,
  getRequestErrorType,
  handleRequestError,
  isRetryableRequestError,
  REQUEST_ERROR_TYPE,
  shouldRetryQuery
} from '@/shared/helpers';

import { getCharacter } from '../api';

const CHARACTER_ERROR_MESSAGES = createErrorMessages('character');

export const useCharacter = (id: number) => {
  const navigate = useNavigate();

  const isValidId = Boolean(id) && !Number.isNaN(id);

  const {
    data,
    isPending,
    isFetching,
    error,
    refetch: refetchQuery
  } = useQuery({
    queryKey: ['character', id],
    queryFn: ({ signal }) => getCharacter(id, signal),
    enabled: isValidId,
    retry: (failureCount, queryError) =>
      shouldRetryQuery(failureCount, queryError),
    retryDelay: QUERY_RETRY_DELAY_MS
  });

  useEffect(() => {
    if (!error) return;

    const errorType = getRequestErrorType(error);

    if (errorType === REQUEST_ERROR_TYPE.NOT_FOUND) {
      navigate('/not-found', { replace: true });
      return;
    }

    if (!isFetching) {
      handleRequestError(error, CHARACTER_ERROR_MESSAGES);
    }
  }, [error, isFetching, navigate]);

  const refetch = useCallback(() => {
    refetchQuery();
  }, [refetchQuery]);

  const isLoading = isPending || isFetching;

  const showRetryError = Boolean(
    error && !isLoading && !data && isRetryableRequestError(error)
  );

  return {
    character: data ?? null,
    isLoading,
    showRetryError,
    refetch
  };
};
