import type { Meta, StoryObj } from '@storybook/sveltekit';

import ComboboxPreview from './ComboboxPreview.svelte';

const meta = {
  title: 'Components/Combobox',
  component: ComboboxPreview,
  args: {
    disabled: false,
    error: '',
    hint: '',
    label: 'Regiao',
    size: 'md',
    value: ''
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    value: { control: 'text' }
  }
} satisfies Meta<typeof ComboboxPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = {
  args: {
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    size: 'lg'
  }
};

export const WithHint: Story = {
  args: {
    hint: 'Digite o codigo da regiao ou o nome.',
    value: ''
  }
};

export const WithError: Story = {
  args: {
    error: 'Regiao obrigatoria.',
    hint: '',
    value: ''
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'us-east-1 — US East (N. Virginia)'
  }
};
