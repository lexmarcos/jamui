import type { Meta, StoryObj } from '@storybook/sveltekit';

import SeparatorPreview from './SeparatorPreview.svelte';
import SeparatorVariantsPreview from './SeparatorVariantsPreview.svelte';
import SeparatorSizesPreview from './SeparatorSizesPreview.svelte';
import SeparatorVerticalPreview from './SeparatorVerticalPreview.svelte';
import SeparatorContextPreview from './SeparatorContextPreview.svelte';

const meta = {
  title: 'Components/Separator',
  component: SeparatorPreview,
  args: {
    orientation: 'horizontal',
    size: 'md',
    variant: 'default',
    decorative: false
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical']
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'muted', 'strong', 'dashed', 'dotted']
    },
    decorative: { control: 'boolean' }
  }
} satisfies Meta<typeof SeparatorPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => ({
    Component: SeparatorVariantsPreview,
    props: args
  })
};

export const Sizes: Story = {
  render: (args) => ({
    Component: SeparatorSizesPreview,
    props: args
  })
};

export const Vertical: Story = {
  render: (args) => ({
    Component: SeparatorVerticalPreview,
    props: args
  })
};

export const Contexts: Story = {
  name: 'Context Usage',
  render: (args) => ({
    Component: SeparatorContextPreview,
    props: args
  })
};
