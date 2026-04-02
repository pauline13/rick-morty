import { useState } from 'react';

import { CardImage, CheckIcon, CloseIcon, EditIcon } from '@/shared/assets';
import { ButtonIcon } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import type { Character } from '@/shared/types';
import { CharacterForm } from '@/widgets';

import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  onChange: (value: Character) => void;
}

export const CharacterCard = ({ character, onChange }: CharacterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={classNames(
        'CharacterCard',
        isEditing && 'CharacterCard_editing'
      )}
    >
      <img className='CharacterCard__image' src={CardImage} alt='' />

      <div className='CharacterCard__content'>
        <CharacterForm
          value={character}
          onChange={onChange}
          isEditing={isEditing}
        />
      </div>

      <div className='CharacterCard__actions'>
        {!isEditing ? (
          <ButtonIcon size='sm' onClick={() => setIsEditing(true)}>
            <EditIcon />
          </ButtonIcon>
        ) : (
          <>
            <ButtonIcon onClick={() => setIsEditing(false)}>
              <CloseIcon />
            </ButtonIcon>
            <ButtonIcon type='submit' onClick={() => setIsEditing(false)}>
              <CheckIcon />
            </ButtonIcon>
          </>
        )}
      </div>
    </div>
  );
};
