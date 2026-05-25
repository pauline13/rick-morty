import { useNavigate, useParams } from 'react-router';

import { useCharacter, type Character } from '@/entities/character/';
import { formatFieldValue } from '@/pages/character-info/lib';
import { Button, ButtonBack, Loader } from '@/shared/components';

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
  const { character, isLoading, showRetryError, refetch } = useCharacter(
    Number(id)
  );

  return (
    <section className='CharacterInfoPage'>
      <nav>
        <ButtonBack onClick={() => navigate('/')} />
      </nav>

      {isLoading && (
        <div className='CharacterInfoPage__loader'>
          <Loader size='xl' text='Loading character card...' />
        </div>
      )}

      {showRetryError && (
        <div className='CharacterInfoPage__error'>
          <p className='CharacterInfoPage__errorText'>Character loading failed</p>
          <Button
            text='Retry'
            onClick={refetch}
            className='CharacterInfoPage__retryButton'
          />
        </div>
      )}

      {!isLoading && character && (
        <div className='CharacterInfoPage__container'>
          <img
            className='CharacterInfoPage__img'
            src={character.image}
            alt={character.name}
          />
          <h1 className='CharacterInfoPage__name'>{character.name}</h1>
          <h2 className='CharacterInfoPage__infoTitle'>Information</h2>
          <dl className='CharacterInfoPage__fields'>
            {CHARACTER_FIELDS.map((field) => (
              <div className='CharacterInfoPage__field' key={field.key}>
                <dt className='CharacterInfoPage__fieldLabel'>{field.label}</dt>
                <dd className='CharacterInfoPage__fieldValue'>
                  {formatFieldValue(character[field.key])}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
};
