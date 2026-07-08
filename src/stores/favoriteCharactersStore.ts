import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Character } from '@/entities/character';

export type FavoriteCharacter = Pick<Character, 'id' | 'name'>;

interface FavoriteCharactersState {
  favoriteCharacters: FavoriteCharacter[];
  toggleFavorite: (character: FavoriteCharacter) => void;
  removeFavorite: (characterId: FavoriteCharacter['id']) => void;
  isFavorite: (characterId: FavoriteCharacter['id']) => boolean;
}

export const useFavoriteCharactersStore = create<FavoriteCharactersState>()(
  persist(
    (set, get) => ({
      favoriteCharacters: [],
      toggleFavorite: (character) => {
        const isAlreadyFavorite = get().isFavorite(character.id);

        set(
          (state) => ({
            favoriteCharacters: isAlreadyFavorite
              ? state.favoriteCharacters.filter(({ id }) => id !== character.id)
              : [...state.favoriteCharacters, character]
          }),
          false
        );
      },
      removeFavorite: (characterId) =>
        set(
          (state) => ({
            favoriteCharacters: state.favoriteCharacters.filter(
              ({ id }) => id !== characterId
            )
          }),
          false
        ),
      isFavorite: (characterId) =>
        get().favoriteCharacters.some(({ id }) => id === characterId)
    }),
    { name: 'favorite-characters' }
  )
);
