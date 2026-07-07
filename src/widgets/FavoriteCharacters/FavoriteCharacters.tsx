import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { FavoriteCharactersProps } from '@/remotes/favoriteCharacters/types';
import { useFavoriteCharactersStore } from '@/stores';

const RemoteFavoriteCharacters = lazy(
  () => import('remote_app/FavoriteCharacters')
);

export const FavoriteCharacters = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const favoriteCharacters = useFavoriteCharactersStore(
    (state) => state.favoriteCharacters
  );
  const removeFavorite = useFavoriteCharactersStore(
    (state) => state.removeFavorite
  );

  const handleCharacterClick = (characterId: number) => {
    navigate(`/character-info/${characterId}`);
  };

  return (
    <Suspense fallback={null}>
      <RemoteFavoriteCharacters
        emptyText={t('favorites.empty')}
        favoriteCharacters={
          favoriteCharacters satisfies FavoriteCharactersProps['favoriteCharacters']
        }
        onCharacterClick={
          handleCharacterClick satisfies FavoriteCharactersProps['onCharacterClick']
        }
        onRemoveFavorite={
          removeFavorite satisfies FavoriteCharactersProps['onRemoveFavorite']
        }
      />
    </Suspense>
  );
};
