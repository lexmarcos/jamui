import type { Meta, StoryObj } from '@storybook/sveltekit';

import EmptyPreview from './EmptyPreview.svelte';
import EmptyVariantsPreview from './EmptyVariantsPreview.svelte';
import EmptySizesPreview from './EmptySizesPreview.svelte';
import EmptyScenariosPreview from './EmptyScenariosPreview.svelte';

const meta = {
  title: 'Components/Empty',
  component: EmptyPreview,
  args: {
    description: 'No items found. Create one to get started.',
    size: 'md',
    title: 'NOTHING HERE',
    variant: 'default'
  },
  argTypes: {
    description: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    title: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'no-data', 'no-results', 'error']
    }
  }
} satisfies Meta<typeof EmptyPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => ({
    Component: EmptyVariantsPreview,
    props: args
  })
};

export const Sizes: Story = {
  render: (args) => ({
    Component: EmptySizesPreview,
    props: args
  })
};

export const Scenarios: Story = {
  render: (args) => ({
    Component: EmptyScenariosPreview,
    props: args
  })
};
