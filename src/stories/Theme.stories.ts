import type { Meta, StoryObj } from '@storybook/sveltekit';

import { JAM_THEME_PRESETS } from '../lib/theme';
import ThemePreview from './ThemePreview.svelte';

const colorControl = { control: { type: 'color' } } as const;

const meta = {
  title: 'Design System/Theme',
  component: ThemePreview,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    ...JAM_THEME_PRESETS.jam
  },
  argTypes: {
    bg: colorControl,
    surface: colorControl,
    surfaceStrong: colorControl,
    input: colorControl,
    text: colorControl,
    muted: colorControl,
    soft: colorControl,
    danger: colorControl
  }
} satisfies Meta<typeof ThemePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Configurator: Story = {};

export const Ink: Story = {
  args: {
    ...JAM_THEME_PRESETS.ink
  }
};

export const OpsGreen: Story = {
  args: {
    ...JAM_THEME_PRESETS.green
  }
};

export const Violet: Story = {
  args: {
    ...JAM_THEME_PRESETS.violet
  }
};

export const SolarizedDark: Story = {
  args: {
    ...JAM_THEME_PRESETS.solarizedDark
  }
};

export const SolarizedLight: Story = {
  args: {
    ...JAM_THEME_PRESETS.solarizedLight
  }
};

export const FullBlack: Story = {
  args: {
    ...JAM_THEME_PRESETS.fullBlack
  }
};

export const BlackGreen: Story = {
  args: {
    ...JAM_THEME_PRESETS.blackGreen
  }
};

export const OldTerminal: Story = {
  args: {
    ...JAM_THEME_PRESETS.oldTerminal
  }
};
