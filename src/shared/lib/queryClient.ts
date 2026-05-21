import { QueryClient } from '@tanstack/react-query';

import {
  QUERY_RETRY_COUNT,
  QUERY_RETRY_DELAY_MS,
  QUERY_STALE_TIME_MS
} from '@/shared/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: QUERY_RETRY_COUNT,
      retryDelay: QUERY_RETRY_DELAY_MS,
      staleTime: QUERY_STALE_TIME_MS,
      refetchOnWindowFocus: false
    }
  }
});
