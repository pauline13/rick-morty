import type { Option } from '@/shared/components';
import type { Status } from '@/shared/types';

export const STATUS_OPTIONS: Option<Status>[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];
