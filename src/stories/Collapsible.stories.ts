import type { Meta, StoryObj } from '@storybook/sveltekit';

import CollapsiblePreview from './CollapsiblePreview.svelte';
import CollapsibleVariantsPreview from './CollapsibleVariantsPreview.svelte';

const meta = {
  title: 'Components/Collapsible',
  component: CollapsiblePreview,
  args: {
    open: false,
    variant: 'default'
  },
  argTypes: {
    open: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'ghost', 'bordered']
    }
  }
} satisfies Meta<typeof CollapsiblePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: CollapsibleVariantsPreview
  })
};

export const Open: Story = {
  args: {
    open: true
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  }
};

export const Bordered: Story = {
  args: {
    variant: 'bordered'
  }
};
