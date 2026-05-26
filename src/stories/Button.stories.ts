import type { Meta, StoryObj } from '@storybook/sveltekit';

import ButtonPreview from './ButtonPreview.svelte';
import ButtonSizesPreview from './ButtonSizesPreview.svelte';
import ButtonVariantsPreview from './ButtonVariantsPreview.svelte';

const meta = {
  title: 'Components/Button',
  component: ButtonPreview,
  args: {
    disabled: false,
    label: 'Salvar',
    size: 'md',
    type: 'button',
    variant: 'primary'
  },
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset']
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger']
    }
  }
} satisfies Meta<typeof ButtonPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => ({
    Component: ButtonVariantsPreview,
    props: args
  })
};

export const Sizes: Story = {
  render: (args) => ({
    Component: ButtonSizesPreview,
    props: args
  })
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
