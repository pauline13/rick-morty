import { memo } from 'react';

import { useCharactersFiltersStore } from '@/stores';

import { FiltersPanelView } from './FiltersPanelView';

import './FiltersPanel.css';

interface FiltersPanelProps {
  disabled?: boolean;
}

export const FiltersPanel = memo(({ disabled }: FiltersPanelProps) => {
  const filters = useCharactersFiltersStore((state) => state.filters);
  const setFilters = useCharactersFiltersStore((state) => state.setFilters);

  return (
    <FiltersPanelView
      value={filters}
      onChange={(updatedFilters) => setFilters(updatedFilters)}
      disabled={disabled}
    />
  );
});
