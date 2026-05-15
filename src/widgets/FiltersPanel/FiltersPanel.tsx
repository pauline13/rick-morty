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
import { classNames, toFilterValue, withAllOption } from '@/shared/helpers';

import './FiltersPanel.css';

interface FiltersPanelProps {
  nameValue: string;
  onNameChange: (name: string) => void;
  isNamePending?: boolean;
  value: CharactersFilters;
  onChange: (value: CharactersFilters) => void;
  disabledSelects?: boolean;
}

const STATUS_FILTER_OPTIONS = withAllOption(STATUS_OPTIONS, ALL_FILTER_OPTION);
const SPECIES_FILTER_OPTIONS = withAllOption(
  SPECIES_OPTIONS,
  ALL_FILTER_OPTION
);
const GENDER_FILTER_OPTIONS = withAllOption(GENDER_OPTIONS, ALL_FILTER_OPTION);

export const FiltersPanel = memo(
  ({
    nameValue,
    onNameChange,
    isNamePending,
    value,
    onChange,
    disabledSelects
  }: FiltersPanelProps) => {
    const filtersWithCurrentName = (patch: Partial<CharactersFilters>) => ({
      ...value,
      ...patch,
      name: nameValue
    });

    return (
      <section className='FiltersPanel'>
        <Input
          classNameWrapper={classNames('FiltersPanel__field', {
            FiltersPanel__field_pending: isNamePending
          })}
          placeholder='Filter by name...'
          value={nameValue}
          onChange={onNameChange}
          rightIcon={<SearchIcon />}
          clearIconSize='xl'
        />
        <Select
          className='FiltersPanel__field'
          value={value.species}
          options={SPECIES_FILTER_OPTIONS}
          placeholder='Species'
          onChange={(species) =>
            onChange(
              filtersWithCurrentName({
                species: toFilterValue(species, SPECIES_OPTIONS)
              })
            )
          }
          disabled={disabledSelects}
        />
        <Select
          className='FiltersPanel__field'
          value={value.gender}
          options={GENDER_FILTER_OPTIONS}
          placeholder='Gender'
          onChange={(gender) =>
            onChange(
              filtersWithCurrentName({
                gender: toFilterValue(gender, GENDER_OPTIONS)
              })
            )
          }
          disabled={disabledSelects}
        />
        <Select
          className='FiltersPanel__field'
          value={value.status}
          options={STATUS_FILTER_OPTIONS}
          placeholder='Status'
          onChange={(status) =>
            onChange(
              filtersWithCurrentName({
                status: toFilterValue(status, STATUS_OPTIONS)
              })
            )
          }
          disabled={disabledSelects}
        />
      </section>
    );
  }
);
