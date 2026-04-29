import { memo, useState } from 'react';

import type { Character } from '@/entities/character';
import { CheckIcon, CloseIcon, EditIcon } from '@/shared/assets';
import { ButtonIcon } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { CharacterForm } from '@/widgets';

import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  updateCharacter: (value: Character) => void;
}

export const CharacterCard = memo(
  ({ character, updateCharacter }: CharacterCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftCharacter, setDraftCharacter] = useState(character);

    const handleStartEdit = () => {
      setDraftCharacter(character);
      setIsEditing(true);
    };

    const handleCancelEdit = () => {
      setDraftCharacter(character);
      setIsEditing(false);
    };

    const handleSaveEdit = () => {
      updateCharacter(draftCharacter);
      setIsEditing(false);
    };

    return (
      <div
        className={classNames(
          'CharacterCard',
          isEditing && 'CharacterCard_editing'
        )}
      >
        <img
          className='CharacterCard__image'
          src={character.image}
          alt={character.name}
        />

        <div className='CharacterCard__content'>
          <CharacterForm
            value={isEditing ? draftCharacter : character}
            onChange={setDraftCharacter}
            isEditing={isEditing}
          />
        </div>

        <div className='CharacterCard__actions'>
          {!isEditing ? (
            <ButtonIcon size='sm' onClick={handleStartEdit}>
              <EditIcon />
            </ButtonIcon>
          ) : (
            <>
              <ButtonIcon onClick={handleCancelEdit}>
                <CloseIcon />
              </ButtonIcon>
              <ButtonIcon type='submit' onClick={handleSaveEdit}>
                <CheckIcon />
              </ButtonIcon>
            </>
          )}
        </div>
      </div>
    );
  }
);
