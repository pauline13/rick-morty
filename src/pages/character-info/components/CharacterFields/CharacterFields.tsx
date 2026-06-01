import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { Character } from '@/entities/character';

import { formatFieldValue } from '../../lib';

import './CharacterFields.css';

type CharacterField = {
  key: keyof Character;
  labelKey: ParseKeys;
  isTranslatable: boolean;
};

const CHARACTER_FIELDS: CharacterField[] = [
  {
    key: 'gender',
    labelKey: 'characters.info.fields.gender',
    isTranslatable: true
  },
  {
    key: 'status',
    labelKey: 'characters.info.fields.status',
    isTranslatable: true
  },
  {
    key: 'species',
    labelKey: 'characters.info.fields.species',
    isTranslatable: true
  },
  {
    key: 'origin',
    labelKey: 'characters.info.fields.origin',
    isTranslatable: false
  },
  {
    key: 'type',
    labelKey: 'characters.info.fields.type',
    isTranslatable: false
  },
  {
    key: 'location',
    labelKey: 'characters.info.fields.location',
    isTranslatable: false
  }
];

interface CharacterFieldsProps {
  character: Character;
}

export const CharacterFields = ({ character }: CharacterFieldsProps) => {
  const { t } = useTranslation();

  return (
    <dl className='CharacterFields'>
      {CHARACTER_FIELDS.map((field) => (
        <div className='CharacterFields__field' key={field.key}>
          <dt className='CharacterFields__label'>{t(field.labelKey)}</dt>
          <dd className='CharacterFields__value'>
            {field.isTranslatable && typeof character[field.key] === 'string'
              ? t(
                  `filters.options.${(character[field.key] as string).toLowerCase()}` as ParseKeys,
                  { defaultValue: formatFieldValue(character[field.key]) }
                )
              : formatFieldValue(
                  character[field.key],
                  t('filters.options.unknown')
                )}
          </dd>
        </div>
      ))}
    </dl>
  );
};
