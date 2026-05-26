import type { Meta, StoryObj } from '@storybook/sveltekit';

import DropdownPreview from './DropdownPreview.svelte';

const meta = {
  title: 'Components/Dropdown',
  component: DropdownPreview,
  args: {
    align: 'start'
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'end']
    }
  }
} satisfies Meta<typeof DropdownPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AlignedEnd: Story = {
  args: {
    align: 'end'
  }
};
