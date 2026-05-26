import type { Meta, StoryObj } from '@storybook/sveltekit';

import SliderPreview from './SliderPreview.svelte';

const meta = {
  title: 'Components/Slider',
  component: SliderPreview,
  args: {
    label: 'Volume',
    max: 100,
    min: 0,
    size: 'md',
    step: 1,
    value: 42,
    variant: 'default'
  },
  argTypes: {
    label: { control: 'text' },
    max: { control: 'number' },
    min: { control: 'number' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    step: { control: 'number' },
    value: { control: 'number' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'danger']
    }
  }
} satisfies Meta<typeof SliderPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    value: 25
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    value: 75
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    value: 80,
    label: 'Progresso'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 55,
    label: 'Carga'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    value: 92,
    label: 'Temperatura'
  }
};

export const NoLabel: Story = {
  args: {
    label: '',
    value: 33
  }
};

export const Stepped: Story = {
  args: {
    step: 10,
    value: 30,
    label: 'Brilho'
  }
};
