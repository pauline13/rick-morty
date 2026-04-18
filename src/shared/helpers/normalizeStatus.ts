import type { Status } from '@/shared/types';

export const normalizeStatus = (status: string): Status => {
  const value = status.toLowerCase().trim();

  if (value === 'alive' || value === 'dead' || value === 'unknown') {
    return value;
  }

  return 'unknown';
};
