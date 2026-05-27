import type { Meta, StoryObj } from '@storybook/sveltekit';

import DrawerPreview from './DrawerPreview.svelte';
import DrawerVariantsPreview from './DrawerVariantsPreview.svelte';

const meta = {
  title: 'Components/Drawer',
  component: DrawerPreview,
  args: {
    open: false,
    position: 'right'
  },
  argTypes: {
    open: { control: 'boolean' },
    position: {
      control: 'inline-radio',
      options: ['left', 'right', 'top', 'bottom']
    }
  }
} satisfies Meta<typeof DrawerPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: DrawerVariantsPreview
  })
};

export const Open: Story = {
  args: {
    open: true
  }
};

export const Left: Story = {
  args: {
    position: 'left',
    open: true
  }
};

export const Top: Story = {
  args: {
    position: 'top',
    open: true
  }
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    open: true
  }
};
