import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { StarIcon } from '@/shared/assets';
import { Button } from '@/shared/components';
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
    <Suspense fallback={<Button icon={<StarIcon />} disabled />}>
      <RemoteFavoriteCharacters
        emptyText={t('favorites.empty')}
        favoriteCharacters={favoriteCharacters}
        onCharacterClick={handleCharacterClick}
        onRemoveFavorite={removeFavorite}
      />
    </Suspense>
  );
};
