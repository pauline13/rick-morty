import { useState, useTransition } from 'react';

import { useCharacters, type CharactersFilters } from '@/entities/character';
import { logoXlImage } from '@/shared/assets';
import { EmptyState, Loader, InfiniteScroll } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';

import './CharactersPage.css';

const INITIAL_FILTERS: CharactersFilters = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

export const CharactersPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<CharactersFilters>(INITIAL_FILTERS);
  const [isPending, startTransition] = useTransition();

  const handleNameChange = (name: string) => {
    setSearchInput(name);
    startTransition(() => {
      setFilters((prev) => ({ ...prev, name }));
    });
  };

  const {
    characters,
    isLoading,
    isLoadingMore,
    hasMore,
    hasError,
    loadMore,
    retry,
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
          hasError={hasError}
          onLoadMore={loadMore}
          onRetry={retry}
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
    <section className='CharactersPage'>
      <figure className='CharactersPage__logo'>
        <img src={logoXlImage} alt='Rick and Morty' />
      </figure>
      <aside className='CharactersPage__filters'>
        <FiltersPanel
          nameValue={searchInput}
          onNameChange={handleNameChange}
          isNamePending={isPending}
          value={filters}
          onChange={setFilters}
          disabledSelects={isLoading}
        />
      </aside>

      <section
        className={classNames('CharactersPage__content', {
          CharactersPage__content_empty: isEmpty
        })}
      >
        {content}
      </section>
    </section>
  );
};
