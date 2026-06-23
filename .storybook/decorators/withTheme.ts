import type { Decorator } from '@storybook/react-vite';

type Theme = 'light' | 'dark';

const isTheme = (theme: unknown): theme is Theme =>
  theme === 'light' || theme === 'dark';

export const withTheme: Decorator = (Story, context) => {
  const theme = isTheme(context.globals.theme) ? context.globals.theme : 'light';

  document.documentElement.setAttribute('data-theme', theme);
  document.body.style.backgroundColor = 'var(--background-body)';
  document.body.style.color = 'var(--text-primary)';

  return Story();
};
