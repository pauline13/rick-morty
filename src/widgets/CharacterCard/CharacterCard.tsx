import { memo, useState } from 'react';

import type { Character } from '@/entities/character';
import { CheckIcon, CloseIcon, EditIcon, StarIcon } from '@/shared/assets';
import { ButtonIcon } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { useFavoriteCharactersStore } from '@/stores';
import { CharacterForm } from '@/widgets';

import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
  updateCharacter: (value: Character) => void;
}

export const CharacterCard = memo(
  ({ character, updateCharacter }: CharacterCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftCharacter, setDraftCharacter] = useState(character);

    const isFavorite = useFavoriteCharactersStore((state) =>
      state.isFavorite(character.id)
    );
    const toggleFavorite = useFavoriteCharactersStore(
      (state) => state.toggleFavorite
    );

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

    const handleToggleFavorite = () => {
      toggleFavorite({ id: character.id, name: character.name });
    };

    return (
      <article
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
            nameAction={
              <ButtonIcon
                className={classNames(
                  'CharacterCard__favorite',
                  isFavorite && 'CharacterCard__favorite_active'
                )}
                onClick={handleToggleFavorite}
              >
                <StarIcon className='CharacterCard__starIcon' />
              </ButtonIcon>
            }
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
      </article>
    );
  }
);
