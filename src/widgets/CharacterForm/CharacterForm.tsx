import { Link } from 'react-router';

import { Input, Select, StatusDot } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';
import type { Character } from '@/shared/types';

import './CharacterForm.css';

interface CharacterFormProps {
  value: Character;
  onChange: (value: Character) => void;
  isEditing: boolean;
}

export const CharacterForm = ({
  value,
  onChange,
  isEditing
}: CharacterFormProps) => {
  return (
    <div className='CharacterForm'>
      <div className='CharacterForm__nameWrapper'>
        {isEditing ? (
          <Input
            className='CharacterForm__inputName'
            placeholder={value.name}
            value={value.name}
            variant='underline'
            onChange={(name) => onChange({ ...value, name })}
          />
        ) : (
          <Link to={`/character-info`} className='CharacterForm__linkName'>
            {value.name}
          </Link>
        )}
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>Gender</p>
        <p className='CharacterForm__value'>Male</p>
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>Species</p>
        <p className='CharacterForm__value'>Human</p>
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>Location</p>
        <Input
          placeholder='Location'
          value={value.location}
          readOnly={!isEditing}
          variant='underline'
          size='sm'
          onChange={(location) => onChange({ ...value, location })}
        />
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>Status</p>
        <Select
          options={STATUS_OPTIONS}
          value={value.status}
          readOnly={!isEditing}
          size='sm'
          placeholder='Status'
          onChange={(status) => onChange({ ...value, status })}
          renderSuffix={(option) => <StatusDot status={option.value} />}
        />
      </div>
    </div>
  );
};
