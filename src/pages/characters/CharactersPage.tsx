import { useState } from 'react';

import { LogoXlIcon } from '@/shared/assets';
import type { Character, Status } from '@/shared/types';
import { CharacterCard } from '@/widgets';

import './CharactersPage.css';

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: 'Rick Sanchez',
      location: 'Earth',
      status: 'alive' as Status
    }
  ]);

  const handleCharacterChange = (updated: Character) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <div className='CharactersPage'>
      <div className='CharactersPage__logo'>
        <LogoXlIcon />
      </div>
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          onChange={handleCharacterChange}
        />
      ))}
    </div>
  );
};
