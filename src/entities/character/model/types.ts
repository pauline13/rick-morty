import type { Gender, Species, Status } from '@/shared/types';

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  location: CharacterLocation;
  image: string;
  url: string;
  origin?: CharacterLocation;
}

export interface CharactersFilters {
  name: string;
  status: Status | '';
  species: Species | '';
  gender: Gender | '';
}
