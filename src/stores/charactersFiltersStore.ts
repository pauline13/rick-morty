import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { CharactersFilters } from '@/entities/character';

export const INITIAL_CHARACTERS_FILTERS: CharactersFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

interface CharactersFiltersState {
  filters: CharactersFilters;
  setFilters: (patch: Partial<CharactersFilters>) => void;
  resetFilters: () => void;
}

export const useCharactersFiltersStore = create<CharactersFiltersState>()(
  devtools(
    (set) => ({
      filters: INITIAL_CHARACTERS_FILTERS,
      setFilters: (patch) =>
        set(
          (state) => ({ filters: { ...state.filters, ...patch } }),
          false,
          'setFilters'
        ),
      resetFilters: () =>
        set({ filters: INITIAL_CHARACTERS_FILTERS }, false, 'resetFilters')
    }),
    { name: 'characters-filters' }
  )
);
