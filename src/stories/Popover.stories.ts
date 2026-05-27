import type { Meta, StoryObj } from '@storybook/sveltekit';

import PopoverPreview from './PopoverPreview.svelte';
import PopoverVariantsPreview from './PopoverVariantsPreview.svelte';

const meta = {
  title: 'Components/Popover',
  component: PopoverPreview,
  args: {
    position: 'bottom',
    align: 'center'
  },
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right']
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end']
    }
  }
} satisfies Meta<typeof PopoverPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: PopoverVariantsPreview
  })
};

export const Top: Story = {
  args: {
    position: 'top'
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

export const AlignStart: Story = {
  args: {
    align: 'start'
  }
};

export const AlignEnd: Story = {
  args: {
    align: 'end'
  }
};
