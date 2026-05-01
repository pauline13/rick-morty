import { useState } from 'react';

import { useCharacters, type CharactersFilters } from '@/entities/character';
import { LogoXlIcon } from '@/shared/assets';
import { EmptyState, Loader, InfiniteScroll } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';

import './CharactersPage.css';

export const CharactersPage = () => {
  const [filters, setFilters] = useState<CharactersFilters>({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  const {
    characters,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    updateCharacter
  } = useCharacters(filters);

  const isEmpty = !isLoading && characters.length === 0;
  let content = (
    <>
      <CharactersList
        characters={characters}
        updateCharacter={updateCharacter}
      />
      {hasMore && (
        <InfiniteScroll
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
          loader={<Loader className='CharactersPage__loader' size='sm' />}
        />
      )}
    </>
  );

  if (isLoading) {
    content = (
      <div className='CharactersPage__loader'>
        <Loader size='xl' text='Loading characters...' />
      </div>
    );
  }

  if (isEmpty) {
    content = <EmptyState title='Characters list is empty...' />;
  }

  return (
    <div className='CharactersPage'>
      <div className='CharactersPage__logo'>
        <LogoXlIcon />
      </div>

      <div className='CharactersPage__filters'>
        <FiltersPanel
          value={filters}
          onChange={setFilters}
          disabled={isLoading}
        />
      </div>

      <div
        className={classNames('CharactersPage__content', {
          CharactersPage__content_empty: isEmpty
        })}
      >
        {content}
      </div>
    </div>
  );
};
