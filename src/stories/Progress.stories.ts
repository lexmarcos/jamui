import type { Meta, StoryObj } from '@storybook/sveltekit';

import ProgressPreview from './ProgressPreview.svelte';

const meta = {
  title: 'Components/Progress',
  component: ProgressPreview,
  args: {
    label: 'Upload em andamento',
    max: 100,
    size: 'md',
    value: 42,
    variant: 'default'
  },
  argTypes: {
    label: { control: 'text' },
    max: { control: 'number' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    value: { control: 'number' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'danger']
    }
  }
} satisfies Meta<typeof ProgressPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    value: 75
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    value: 88
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    value: 100,
    label: 'Concluido'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 67,
    label: 'Processando com atencao'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    value: 12,
    label: 'Erro detectado'
  }
};

export const NoLabel: Story = {
  args: {
    label: '',
    value: 55
  }
};
