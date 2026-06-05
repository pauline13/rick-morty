import { useTranslation } from 'react-i18next';

import { ArrowBackIcon } from '@/shared/assets';
import './ButtonBack.css';

interface ButtonBackProps {
  onClick?: () => void;
}

export const ButtonBack = ({ onClick }: ButtonBackProps) => {
  const { t } = useTranslation();

  return (
    <button className='ButtonBack' onClick={onClick}>
      <ArrowBackIcon />
      <span className='ButtonBack__text'>
        {t('common.goBack').toUpperCase()}
      </span>
    </button>
  );
};
