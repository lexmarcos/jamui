import '../src/styles.css';

import type { Preview } from '@storybook/sveltekit';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'jam',
      values: [
        { name: 'jam', value: '#1713c8' },
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
