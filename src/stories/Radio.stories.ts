import type { Meta, StoryObj } from '@storybook/sveltekit';

import RadioPreview from './RadioPreview.svelte';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioPreview,
  args: {
    disabled: false,
    label: 'Tamanho',
    orientation: 'vertical',
    value: 'md'
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal']
    },
    value: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof RadioPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'sm'
  }
};

export const NoLabel: Story = {
  args: {
    label: ''
  }
};
