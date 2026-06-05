import { useTranslation } from 'react-i18next';

import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='Footer'>
      <p className='Footer__text'>{t('layout.footer.madeBy')}</p>
    </footer>
  );
};
