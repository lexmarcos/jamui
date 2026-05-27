import '../src/styles.css';

import type { Preview } from '@storybook/sveltekit';
import {
  applyStorybookTheme,
  JAM_STORYBOOK_THEME_OPTIONS
} from '../src/stories/theme-controls';

const preview: Preview = {
  globalTypes: {
    jamTheme: {
      name: 'Theme',
      description: 'JamUI color theme',
      toolbar: {
        icon: 'paintbrush',
        items: JAM_STORYBOOK_THEME_OPTIONS,
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    jamTheme: 'jam'
  },
  decorators: [
    (Story, context) => {
      applyStorybookTheme(context.globals.jamTheme as string | undefined);
      return Story();
    }
  ],
  parameters: {
    backgrounds: {
      default: 'jam',
      values: [
        { name: 'jam', value: '#1713c8' },
        { name: 'ink', value: '#101018' },
        { name: 'green', value: '#063a32' },
        { name: 'violet', value: '#2a1768' },
        { name: 'solarized dark', value: '#002b36' },
        { name: 'solarized light', value: '#fdf6e3' },
        { name: 'full black', value: '#000000' },
        { name: 'black green', value: '#000000' },
        { name: 'old terminal', value: '#120f08' },
        { name: 'surface', value: '#1410bd' },
        { name: 'light', value: '#fbfbff' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered'
  }
};

export default preview;
