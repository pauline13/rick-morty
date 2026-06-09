import type { Character } from '@/entities/character';
import { CharacterCard } from '@/widgets';

import './CharactersList.scss';

type CharactersListProps = {
  characters: Character[];
  updateCharacter: (character: Character) => void;
};

export const CharactersList = ({
  characters,
  updateCharacter
}: CharactersListProps) => {
  return (
    <ul className='CharactersList' data-testid='characters-list'>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard
            character={character}
            updateCharacter={updateCharacter}
          />
        </li>
      ))}
    </ul>
  );
};
