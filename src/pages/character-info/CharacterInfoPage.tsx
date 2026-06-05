import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useCharacter } from '@/entities/character/';
import { Button, ButtonBack, Loader } from '@/shared/components';

import { CharacterFields } from './components';

import './CharacterInfoPage.css';

export const CharacterInfoPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, isLoading, showRetryError, refetch } = useCharacter(
    Number(id)
  );

  return (
    <section className='CharacterInfoPage'>
      <nav>
        <ButtonBack onClick={() => navigate('/')} />
      </nav>

      {isLoading && (
        <div className='CharacterInfoPage__loader'>
          <Loader size='xl' text={t('characters.info.loading')} />
        </div>
      )}

      {showRetryError && (
        <div className='CharacterInfoPage__error'>
          <p className='CharacterInfoPage__errorText'>
            {t('characters.info.loadingFailed')}
          </p>
          <Button
            text={t('common.retry')}
            onClick={refetch}
            className='CharacterInfoPage__retryButton'
          />
        </div>
      )}

      {!isLoading && character && (
        <div className='CharacterInfoPage__container'>
          <img
            className='CharacterInfoPage__img'
            src={character.image}
            alt={character.name}
          />
          <h1 className='CharacterInfoPage__name'>{character.name}</h1>
          <h2 className='CharacterInfoPage__infoTitle'>
            {t('characters.info.title')}
          </h2>
          <CharacterFields character={character} />
        </div>
      )}
    </section>
  );
};
