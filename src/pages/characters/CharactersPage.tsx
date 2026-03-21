import { useState } from 'react';
import { useNavigate } from 'react-router';

import { LogoXlIcon } from '@/shared/assets';
import {
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

  const [value, setValue] = useState('');

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
        value={value}
        onChange={setValue}
        placeholder='Select option'
        size='xl'
      />
      <br />
      <Select
        options={options}
        value={value}
        onChange={setValue}
        placeholder='Select option'
        size='sm'
        renderSuffix={renderStatus}
      />
    </div>
  );
};
