export type Status = 'alive' | 'dead' | 'unknown';

export interface Character {
  id: number;
  name: string;
  location: string;
  status: Status;
}
