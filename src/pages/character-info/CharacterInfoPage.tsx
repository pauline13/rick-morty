import { useNavigate, useParams } from 'react-router';

import { useCharacter, type Character } from '@/entities/character/';
import { formatFieldValue } from '@/pages/character-info/lib';
import { ButtonBack, Loader } from '@/shared/components';

import './CharacterInfoPage.css';

const CHARACTER_FIELDS: { key: keyof Character; label: string }[] = [
  { key: 'gender', label: 'Gender' },
  { key: 'status', label: 'Status' },
  { key: 'species', label: 'Specie' },
  { key: 'origin', label: 'Origin' },
  { key: 'type', label: 'Type' },
  { key: 'location', label: 'Location' }
];

export const CharacterInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, isLoading } = useCharacter(Number(id));

  return (
    <section className='CharacterInfoPage'>
      <div>
        <ButtonBack onClick={() => navigate('/')} />
      </div>

      {isLoading && (
        <div className='CharacterInfoPage__loader'>
          <Loader size='xl' text='Loading character card...' />
        </div>
      )}

      {!isLoading && character && (
        <div className='CharacterInfoPage__container'>
          <img
            className='CharacterInfoPage__img'
            src={character.image}
            alt={character.name}
          />
          <p className='CharacterInfoPage__name'>{character.name}</p>
          <p className='CharacterInfoPage__infoTitle'>Information</p>
          <div className='CharacterInfoPage__fields'>
            {CHARACTER_FIELDS.map((field) => (
              <div className='CharacterInfoPage__field' key={field.key}>
                <p className='CharacterInfoPage__fieldLabel'>{field.label}</p>
                <p className='CharacterInfoPage__fieldValue'>
                  {formatFieldValue(character[field.key])}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
