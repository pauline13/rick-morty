export interface FavoriteCharacter {
  id: number;
  name: string;
}

export interface FavoriteCharactersProps {
  favoriteCharacters: FavoriteCharacter[];
  onRemoveFavorite: (characterId: FavoriteCharacter['id']) => void;
  onCharacterClick: (characterId: FavoriteCharacter['id']) => void;
  emptyText?: string;
}
