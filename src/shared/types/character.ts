import type { Status } from '@/shared/types';

export interface Character {
  id: number;
  name: string;
  location: string;
  status: Status;
}
