import type { Meta, StoryObj } from '@storybook/sveltekit';

import BadgePreview from './BadgePreview.svelte';
import BadgeVariantsPreview from './BadgeVariantsPreview.svelte';

const meta = {
  title: 'Components/Badge',
  component: BadgePreview,
  args: {
    size: 'md',
    style: 'filled',
    variant: 'default'
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md']
    },
    style: {
      control: 'inline-radio',
      options: ['filled', 'outline', 'soft']
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'danger', 'info']
    }
  }
} satisfies Meta<typeof BadgePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: BadgeVariantsPreview
  })
};

export const Outline: Story = {
  args: {
    style: 'outline'
  }
};

export const Soft: Story = {
  args: {
    style: 'soft'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'danger'
  }
};
