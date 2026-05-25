import { QUERY_RETRY_COUNT } from '@/shared/constants';

import {
  getRequestErrorType,
  REQUEST_ERROR_TYPE,
  type RequestErrorType
} from './requestError';

const RETRYABLE_ERROR_TYPES = new Set<RequestErrorType>([
  REQUEST_ERROR_TYPE.NETWORK,
  REQUEST_ERROR_TYPE.SERVER,
  REQUEST_ERROR_TYPE.RATE_LIMITED
]);

export const isRetryableRequestError = (error: unknown): boolean =>
  RETRYABLE_ERROR_TYPES.has(getRequestErrorType(error));

export const shouldRetryQuery = (failureCount: number, error: unknown): boolean =>
  isRetryableRequestError(error) && failureCount < QUERY_RETRY_COUNT;
