import { useState } from 'react';
import { useNavigate } from 'react-router';

import { LogoXlIcon, SearchIcon } from '@/shared/assets';
import {
  Input,
  Select,
  StatusDot,
  type Option,
  type Status
} from '@/shared/components';
import './CharactersPage.css';

const options: Option[] = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' }
];

const statusMap: Record<string, Status> = {
  '1': 'alive',
  '2': 'dead'
};

export const CharactersPage = () => {
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const renderStatus = (option: Option) => {
    const status = statusMap[option.value];
    if (!status) return null;

    return <StatusDot status={status} />;
  };

  return (
    <div className='CharactersPage'>
      <div
        className='CharactersPage__logo'
        onClick={() => navigate('/character-info')}
      >
        <LogoXlIcon />
      </div>
      <br />
      <Select
        options={options}
        value={selectValue}
        onChange={setSelectValue}
        placeholder='Select option'
        size='xl'
      />
      <br />
      <Select
        options={options}
        value={selectValue}
        onChange={setSelectValue}
        placeholder='Select option'
        size='sm'
        renderSuffix={renderStatus}
      />
      <br />
      <Input
        value={inputValue}
        rightIcon={<SearchIcon />}
        variant='outline'
        onChange={setInputValue}
      />
      <br />
      <Input value={inputValue} variant='underline' onChange={setInputValue} />
    </div>
  );
};
