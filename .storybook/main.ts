import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const withoutPwaPlugin = (plugins: PluginOption[] = []): PluginOption[] =>
  plugins.flatMap((plugin) => {
    if (Array.isArray(plugin)) return withoutPwaPlugin(plugin);
    if (!plugin || typeof plugin === 'boolean') return [];
    if ('name' in plugin && plugin.name.startsWith('vite-plugin-pwa')) {
      return [];
    }
    return [plugin];
  });

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) =>
    mergeConfig(
      {
        ...config,
        plugins: withoutPwaPlugin(config.plugins)
      },
      {
        plugins: [svgr()],
        resolve: {
          alias: {
            '@': path.resolve(dirname, '../src')
          }
        }
      }
    )
};

export default config;
