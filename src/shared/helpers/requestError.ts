import axios from 'axios';
import type { ParseKeys } from 'i18next';
import { toast } from 'react-hot-toast';

import { i18n } from '@/shared/i18n';

export const REQUEST_ERROR_TYPE = {
  CANCELED: 'canceled',
  NOT_FOUND: 'notFound',
  NETWORK: 'network',
  SERVER: 'server',
  RATE_LIMITED: 'rateLimited',
  UNKNOWN: 'unknown'
} as const;

export type RequestErrorType =
  (typeof REQUEST_ERROR_TYPE)[keyof typeof REQUEST_ERROR_TYPE];

const getDefaultErrorMessage = (
  type: RequestErrorType
): string | undefined => {
  const keyMap: Partial<Record<RequestErrorType, string>> = {
    [REQUEST_ERROR_TYPE.NETWORK]: 'common.errors.default.network',
    [REQUEST_ERROR_TYPE.SERVER]: 'common.errors.default.server',
    [REQUEST_ERROR_TYPE.RATE_LIMITED]: 'common.errors.default.rateLimited',
    [REQUEST_ERROR_TYPE.UNKNOWN]: 'common.errors.default.unknown'
  };

  const key = keyMap[type];
  return key ? i18n.t(key as ParseKeys) : undefined;
};

export const getRequestErrorType = (error: unknown): RequestErrorType => {
  if (error instanceof Error) {
    if (
      error.name === 'CanceledError' ||
      error.name === 'AbortError'
    ) {
      return REQUEST_ERROR_TYPE.CANCELED;
    }
  }

  if (!axios.isAxiosError(error)) {
    return REQUEST_ERROR_TYPE.UNKNOWN;
  }

  if (!error.response) {
    return REQUEST_ERROR_TYPE.NETWORK;
  }

  if (error.response.status === 404) {
    return REQUEST_ERROR_TYPE.NOT_FOUND;
  }

  if (error.response.status === 429) {
    return REQUEST_ERROR_TYPE.RATE_LIMITED;
  }

  if (error.response.status >= 500) {
    return REQUEST_ERROR_TYPE.SERVER;
  }

  return REQUEST_ERROR_TYPE.UNKNOWN;
};

export const handleRequestError = (
  error: unknown,
  messages?: Partial<Record<RequestErrorType, string>>
): RequestErrorType => {
  const errorType = getRequestErrorType(error);

  if (
    errorType === REQUEST_ERROR_TYPE.CANCELED ||
    errorType === REQUEST_ERROR_TYPE.NOT_FOUND
  ) {
    return errorType;
  }

  const message =
    messages?.[errorType] ?? getDefaultErrorMessage(errorType);

  if (message) {
    toast.error(message);
  }

  return errorType;
};
