import type { Meta, StoryObj } from '@storybook/sveltekit';

import SelectPreview from './SelectPreview.svelte';
import SelectVariantsPreview from './SelectVariantsPreview.svelte';

const meta = {
  title: 'Components/Select',
  component: SelectPreview,
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
} satisfies Meta<typeof SelectPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: SelectVariantsPreview
  })
};

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

export const WithError: Story = {
  args: {
    error: 'Regiao obrigatoria.',
    hint: ''
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'us-east-1'
  }
};
