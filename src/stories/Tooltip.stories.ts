import type { Meta, StoryObj } from '@storybook/sveltekit';

import TooltipPreview from './TooltipPreview.svelte';

const meta = {
  title: 'Components/Tooltip',
  component: TooltipPreview,
  args: {
    content: 'Salvar alteracoes no servidor',
    position: 'top'
  },
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right']
    }
  }
} satisfies Meta<typeof TooltipPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Bottom: Story = {
  args: {
    position: 'bottom'
  }
};

export const Left: Story = {
  args: {
    position: 'left'
  }
};

export const Right: Story = {
  args: {
    position: 'right'
  }
};
