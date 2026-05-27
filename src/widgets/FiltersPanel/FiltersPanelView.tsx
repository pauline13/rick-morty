import { memo } from 'react';

import type { CharactersFilters } from '@/entities/character';
import { SearchIcon } from '@/shared/assets';
import { Input, Select } from '@/shared/components';
import {
  STATUS_OPTIONS,
  ALL_FILTER_OPTION,
  SPECIES_OPTIONS,
  GENDER_OPTIONS
} from '@/shared/constants';
import { toFilterValue, withAllOption } from '@/shared/helpers';

export interface FiltersPanelViewProps {
  value: CharactersFilters;
  onChange: (value: CharactersFilters) => void;
  disabled?: boolean;
}

const STATUS_FILTER_OPTIONS = withAllOption(STATUS_OPTIONS, ALL_FILTER_OPTION);
const SPECIES_FILTER_OPTIONS = withAllOption(
  SPECIES_OPTIONS,
  ALL_FILTER_OPTION
);
const GENDER_FILTER_OPTIONS = withAllOption(GENDER_OPTIONS, ALL_FILTER_OPTION);

export const FiltersPanelView = memo(
  ({ value, onChange, disabled }: FiltersPanelViewProps) => {
    return (
      <section className='FiltersPanel'>
        <Input
          classNameWrapper='FiltersPanel__field'
          placeholder='Filter by name...'
          value={value.name}
          onChange={(name) => onChange({ ...value, name })}
          disabled={disabled}
          rightIcon={<SearchIcon />}
          clearIconSize='xl'
          testId='filter-name-input'
        />
        <Select
          className='FiltersPanel__field'
          value={value.species}
          options={SPECIES_FILTER_OPTIONS}
          placeholder='Species'
          onChange={(species) =>
            onChange({
              ...value,
              species: toFilterValue(species, SPECIES_OPTIONS)
            })
          }
          disabled={disabled}
        />
        <Select
          className='FiltersPanel__field'
          value={value.gender}
          options={GENDER_FILTER_OPTIONS}
          placeholder='Gender'
          onChange={(gender) =>
            onChange({
              ...value,
              gender: toFilterValue(gender, GENDER_OPTIONS)
            })
          }
          disabled={disabled}
        />
        <Select
          className='FiltersPanel__field'
          value={value.status}
          options={STATUS_FILTER_OPTIONS}
          placeholder='Status'
          onChange={(status) =>
            onChange({
              ...value,
              status: toFilterValue(status, STATUS_OPTIONS)
            })
          }
          disabled={disabled}
        />
      </section>
    );
  }
);
