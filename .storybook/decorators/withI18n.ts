import type { Decorator } from '@storybook/react-vite';

import { i18n } from '@/shared/i18n';

type Locale = 'en' | 'ru';

const isLocale = (locale: unknown): locale is Locale =>
  locale === 'en' || locale === 'ru';

export const withI18n: Decorator = (Story, context) => {
  const locale = isLocale(context.globals.locale)
    ? context.globals.locale
    : 'en';

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }

  document.documentElement.lang = locale;

  return Story();
};
