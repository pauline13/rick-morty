import { useNavigate, useParams } from 'react-router';

import { useCharacter } from '@/entities/character/';
import { ButtonBack, EmptyState, Loader } from '@/shared/components';
import { CharacterCard } from '@/widgets';

import './CharacterInfoPage.css';

export const CharacterInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, loading } = useCharacter(Number(id));

  return (
    <section className='CharacterInfoPage'>
      <ButtonBack onClick={() => navigate('/')} />

      {loading && (
        <div className='CharacterInfoPage__loader'>
          <Loader size='xl' text='Loading character card...' />
        </div>
      )}

      {!loading && !character && <EmptyState title='Character is not found' />}

      {!loading && character && (
        <CharacterCard
          character={character}
          onChange={() => {
            console.log('Waiting for Store lesson');
          }}
        />
      )}
    </section>
  );
};
