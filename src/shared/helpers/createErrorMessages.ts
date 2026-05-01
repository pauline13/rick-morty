import type { RequestErrorType } from './requestError';

export const createErrorMessages = (entity: string) =>
  ({
    unknown: `Failed to load ${entity}`,
    network: `Failed to load ${entity}. Check your internet connection`,
    server: `Failed to load ${entity}. Please try again later`
  }) satisfies Partial<Record<RequestErrorType, string>>;
