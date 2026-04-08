import { useState } from 'react';

import { SearchIcon } from '@/shared/assets';
import { Input, Select } from '@/shared/components';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';
import type { Status, Species, Gender } from '@/shared/types';

import './FiltersPanel.css';

export const FiltersPanel = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [species, setSpecies] = useState<Species | ''>('');
  const [gender, setGender] = useState<Gender | ''>('');

  return (
    <div className='FiltersPanel'>
      <Input
        classNameWrapper='FiltersPanel__field'
        placeholder='Filter by name...'
        value={name}
        onChange={setName}
        rightIcon={<SearchIcon />}
        clearIconSize='xl'
      />
      <Select
        className='FiltersPanel__field'
        value={species}
        options={SPECIES_OPTIONS}
        placeholder='Species'
        onChange={setSpecies}
      />
      <Select
        className='FiltersPanel__field'
        value={gender}
        options={GENDER_OPTIONS}
        placeholder='Gender'
        onChange={setGender}
      />
      <Select
        className='FiltersPanel__field'
        value={status}
        options={STATUS_OPTIONS}
        placeholder='Status'
        onChange={setStatus}
      />
    </div>
  );
};
