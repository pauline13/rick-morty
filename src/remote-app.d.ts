declare module 'remote_app/FavoriteCharacters' {
  import type { ComponentType } from 'react';

  import type { FavoriteCharactersProps } from '@/remotes/favoriteCharacters/types';

  const FavoriteCharacters: ComponentType<FavoriteCharactersProps>;

  export default FavoriteCharacters;
}
