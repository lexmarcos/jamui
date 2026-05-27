import type { Meta, StoryObj } from '@storybook/sveltekit';

import TextareaPreview from './TextareaPreview.svelte';
import TextareaVariantsPreview from './TextareaVariantsPreview.svelte';

const meta = {
  title: 'Components/Textarea',
  component: TextareaPreview,
  args: {
    disabled: false,
    error: '',
    hint: 'Descreva sua experiencia em detalhes.',
    id: 'description',
    label: 'Descricao',
    maxLength: 280,
    placeholder: 'Digite aqui...',
    resize: 'vertical',
    rows: 4,
    showCounter: true,
    size: 'md',
    value: ''
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    hint: { control: 'text' },
    label: { control: 'text' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' },
    resize: {
      control: 'inline-radio',
      options: ['none', 'vertical', 'horizontal', 'both']
    },
    rows: { control: 'number' },
    showCounter: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    value: { control: 'text' }
  }
} satisfies Meta<typeof TextareaPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: TextareaVariantsPreview
  })
};

export const Filled: Story = {
  args: {
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
};

export const Error: Story = {
  args: {
    error: 'Este campo e obrigatorio.',
    hint: '',
    value: ''
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Este campo esta desabilitado.'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    rows: 3
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    rows: 6
  }
};

export const NoResize: Story = {
  args: {
    resize: 'none'
  }
};

export const OverLimit: Story = {
  args: {
    maxLength: 20,
    showCounter: true,
    value: 'Este texto excede o limite maximo permitido'
  }
};
