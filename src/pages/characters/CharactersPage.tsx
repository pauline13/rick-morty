import { useCharacters } from '@/entities/character/hooks';
import { LogoXlIcon } from '@/shared/assets';
import { EmptyState, Loader } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { CharacterCard, FiltersPanel } from '@/widgets';

import './CharactersPage.css';

export const CharactersPage = () => {
  const { characters, loading } = useCharacters();

  return (
    <div className='CharactersPage'>
      <div className='CharactersPage__logo'>
        <LogoXlIcon />
      </div>
      {loading ? (
        <div className='CharactersPage__loader'>
          <Loader size='xl' text='Loading characters...' />
        </div>
      ) : (
        <>
          <div className='CharactersPage__filters'>
            <FiltersPanel />
          </div>

          <div
            className={classNames('CharactersPage__content', {
              CharactersPage__content_empty: characters.length === 0
            })}
          >
            {characters.length === 0 ? (
              <EmptyState title='Characters list is empty...' />
            ) : (
              <div className='CharactersPage__list'>
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onChange={() => {
                      console.log('Waiting for Store lesson');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
