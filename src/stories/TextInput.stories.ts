import type { Meta, StoryObj } from '@storybook/sveltekit';

import TextInputPreview from './TextInputPreview.svelte';

const meta = {
  title: 'Components/TextInput',
  component: TextInputPreview,
  args: {
    disabled: false,
    error: '',
    hint: 'Digite seu nome publico.',
    id: 'name',
    label: 'Nome',
    placeholder: 'Markzuel',
    type: 'text',
    value: ''
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['email', 'password', 'search', 'tel', 'text', 'url']
    },
    value: { control: 'text' }
  }
} satisfies Meta<typeof TextInputPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Filled: Story = {
  args: {
    value: 'Markzuel'
  }
};

export const Error: Story = {
  args: {
    error: 'Nome obrigatorio.',
    hint: '',
    value: ''
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Markzuel'
  }
};
