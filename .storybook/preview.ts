import type { Preview } from '@storybook/react-vite';

import '@/shared/styles/main.css';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';

const preview: Preview = {
  initialGlobals: {
    locale: 'en',
    theme: 'light'
  },
  globalTypes: {
    locale: {
      description: 'Global language for components',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ru', title: 'Русский' }
        ],
        dynamicTitle: true
      }
    },
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [withTheme, withI18n],
  parameters: {
    layout: 'centered'
  }
};

export default preview;
