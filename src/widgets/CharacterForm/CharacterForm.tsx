import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { Character } from '@/entities/character';
import { Input, Select, StatusDot, type Option } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';

import './CharacterForm.scss';

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
  const { t } = useTranslation();

  const translateOption = <T extends string>(option: Option<T>) => ({
    ...option,
    label: t(`filters.options.${option.value}` as ParseKeys)
  });

  const translateValue = (val: string) =>
    t(`filters.options.${val.toLowerCase()}` as ParseKeys, {
      defaultValue: val
    });

  return (
    <section className='CharacterForm'>
      <div className='CharacterForm__nameWrapper'>
        {isEditing ? (
          <Input
            classNameInput='CharacterForm__inputName'
            placeholder={value.name}
            value={value.name}
            variant='underline'
            onChange={(name) => onChange({ ...value, name })}
          />
        ) : (
          <Link
            to={`/character-info/${value.id}`}
            className='CharacterForm__linkName'
          >
            {value.name}
          </Link>
        )}
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>
          {t('characters.info.fields.gender')}
        </p>
        <p className='CharacterForm__value'>{translateValue(value.gender)}</p>
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>
          {t('characters.info.fields.species')}
        </p>
        <p className='CharacterForm__value'>{translateValue(value.species)}</p>
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>
          {t('characters.info.fields.location')}
        </p>
        <Input
          placeholder={t('characters.info.fields.location')}
          value={value.location.name}
          readOnly={!isEditing}
          variant='underline'
          size='sm'
          onChange={(location) =>
            onChange({
              ...value,
              location: {
                ...value.location,
                name: location
              }
            })
          }
        />
      </div>
      <div className='CharacterForm__field'>
        <p className='CharacterForm__label'>
          {t('characters.info.fields.status')}
        </p>
        <Select
          options={STATUS_OPTIONS.map(translateOption)}
          value={value.status}
          readOnly={!isEditing}
          size='sm'
          placeholder={t('filters.placeholder.status')}
          onChange={(status) => onChange({ ...value, status })}
          renderSuffix={(option) => <StatusDot status={option.value} />}
        />
      </div>
    </section>
  );
};
