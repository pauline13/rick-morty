import axios from 'axios';
import { toast } from 'react-hot-toast';

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

export const DEFAULT_REQUEST_ERROR_MESSAGES: Partial<
  Record<RequestErrorType, string>
> = {
  [REQUEST_ERROR_TYPE.NETWORK]: 'Check your internet connection',
  [REQUEST_ERROR_TYPE.SERVER]: 'Server error. Please try again later',
  [REQUEST_ERROR_TYPE.RATE_LIMITED]: 'Too many requests. Please wait a moment',
  [REQUEST_ERROR_TYPE.UNKNOWN]: 'Something went wrong. Please try again'
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
    messages?.[errorType] ?? DEFAULT_REQUEST_ERROR_MESSAGES[errorType];

  if (message) {
    toast.error(message);
  }

  return errorType;
};
