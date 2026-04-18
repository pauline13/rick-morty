import type { Status } from '@/shared/types';

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  location: CharacterLocation;
  image: string;
  url: string;
  origin?: CharacterLocation;
}
