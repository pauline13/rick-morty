import type { Character } from '@/entities/character';
import { CharacterCard } from '@/widgets';

import './CharactersList.css';

type CharactersListProps = {
  characters: Character[];
  updateCharacter: (character: Character) => void;
};

export const CharactersList = ({
  characters,
  updateCharacter
}: CharactersListProps) => {
  return (
    <div className='CharactersList'>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          updateCharacter={updateCharacter}
        />
      ))}
    </div>
  );
};
