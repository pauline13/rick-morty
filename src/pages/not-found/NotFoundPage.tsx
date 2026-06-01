import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { notFoundImage } from '@/shared/assets';
import { Button } from '@/shared/components';

import './NotFoundPage.css';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className='NotFoundPage'>
      <img src={notFoundImage} alt={t('notFound.imgAlt')} />
      <Button
        className='NotFoundPage__button'
        textClassName='NotFoundPage__buttonText'
        text={t('notFound.goToMain')}
        onClick={() => {
          navigate('/');
        }}
      />
    </section>
  );
};
