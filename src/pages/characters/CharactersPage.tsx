import { useCharacters } from '@/entities/character';
import { logoXlImage } from '@/shared/assets';
import { EmptyState, Loader, InfiniteScroll } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { useCharactersFiltersStore } from '@/store';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';

import './CharactersPage.css';

export const CharactersPage = () => {
  const filters = useCharactersFiltersStore((state) => state.filters);

  const {
    characters,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    fetchNextPage,
    refetch,
    updateCharacter
  } = useCharacters(filters);

  const isEmpty = !isLoading && characters.length === 0;
  let content = (
    <>
      <CharactersList
        characters={characters}
        updateCharacter={updateCharacter}
      />
      {hasNextPage && (
        <InfiniteScroll
          hasMore={hasNextPage}
          isLoadingMore={isFetchingNextPage}
          hasError={isError}
          onLoadMore={() => fetchNextPage()}
          onRetry={refetch}
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
        <FiltersPanel disabled={isLoading} />
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
