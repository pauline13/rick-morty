import type { ParseKeys } from 'i18next';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { CharactersFilters } from '@/entities/character';
import { SearchIcon } from '@/shared/assets';
import { Input, Select, type Option } from '@/shared/components';
import {
  STATUS_OPTIONS,
  ALL_FILTER_OPTION,
  SPECIES_OPTIONS,
  GENDER_OPTIONS
} from '@/shared/constants';
import { classNames, toFilterValue, withAllOption } from '@/shared/helpers';

import { FiltersToggleButton } from '../FiltersToggleButton';

import './FiltersPanelView.scss';

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
    const { t } = useTranslation();
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

    const translateOptions = <T extends string>(options: Option<T>[]) =>
      options.map((o) => ({
        ...o,
        label: t(`filters.options.${o.value}` as ParseKeys)
      }));

    return (
      <section
        className={classNames('FiltersPanelView', {
          FiltersPanelView_expanded: isFiltersExpanded
        })}
      >
        <Input
          classNameWrapper='FiltersPanelView__field'
          placeholder={t('filters.placeholder.name')}
          value={value.name}
          onChange={(name) => onChange({ ...value, name })}
          disabled={disabled}
          rightIcon={<SearchIcon />}
          clearIconSize='xl'
          testId='filter-name-input'
        />
        <Select
          className='FiltersPanelView__field FiltersPanelView__field_select'
          value={value.species}
          options={translateOptions(SPECIES_FILTER_OPTIONS)}
          placeholder={t('filters.placeholder.species')}
          onChange={(species) =>
            onChange({
              ...value,
              species: toFilterValue(species, SPECIES_OPTIONS)
            })
          }
          disabled={disabled}
        />
        <Select
          className='FiltersPanelView__field FiltersPanelView__field_select'
          value={value.gender}
          options={translateOptions(GENDER_FILTER_OPTIONS)}
          placeholder={t('filters.placeholder.gender')}
          onChange={(gender) =>
            onChange({
              ...value,
              gender: toFilterValue(gender, GENDER_OPTIONS)
            })
          }
          disabled={disabled}
        />
        <Select
          className='FiltersPanelView__field FiltersPanelView__field_select'
          value={value.status}
          options={translateOptions(STATUS_FILTER_OPTIONS)}
          placeholder={t('filters.placeholder.status')}
          onChange={(status) =>
            onChange({
              ...value,
              status: toFilterValue(status, STATUS_OPTIONS)
            })
          }
          disabled={disabled}
        />
        <FiltersToggleButton
          isExpanded={isFiltersExpanded}
          onClick={() => setIsFiltersExpanded((prev) => !prev)}
        />
      </section>
    );
  }
);
