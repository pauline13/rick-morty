import type { Option } from '@/shared/components';
import type { Gender, Species, Status } from '@/shared/types';

export const STATUS_OPTIONS: Option<Status>[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' }
];

export const SPECIES_OPTIONS: Option<Species>[] = [
  { label: 'Human', value: 'human' },
  { label: 'Alien', value: 'alien' },
  { label: 'Humanoid', value: 'humanoid' },
  { label: 'Animal', value: 'animal' },
  { label: 'Robot', value: 'robot' },
  { label: 'Cronenberg', value: 'cronenberg' },
  { label: 'Disease', value: 'disease' },
  { label: 'Unknown', value: 'unknown' }
];

export const GENDER_OPTIONS: Option<Gender>[] = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Unknown', value: 'unknown' }
];
