import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language as 'en' | 'ru';
  const nextLang = currentLang === 'en' ? 'ru' : 'en';

  return (
    <Button
      text={t('layout.languageLabel').toUpperCase()}
      onClick={() => i18n.changeLanguage(nextLang)}
    />
  );
};
