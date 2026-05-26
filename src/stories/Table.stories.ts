import type { Meta, StoryObj } from '@storybook/sveltekit';

import TablePreview from './TablePreview.svelte';

const meta = {
  title: 'Components/Table',
  component: TablePreview,
  args: {
    size: 'md',
    striped: false
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['md', 'sm', 'compact']
    },
    striped: { control: 'boolean' }
  }
} satisfies Meta<typeof TablePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Striped: Story = {
  args: {
    striped: true
  }
};

export const Small: Story = {
  args: {
    size: 'sm'
  }
};

export const Compact: Story = {
  args: {
    size: 'compact'
  }
};

export const CompactStriped: Story = {
  args: {
    size: 'compact',
    striped: true
  }
};
