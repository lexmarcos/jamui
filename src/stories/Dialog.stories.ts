import type { Meta, StoryObj } from '@storybook/sveltekit';
import DialogPreview from './DialogPreview.svelte';
import DialogVariantsPreview from './DialogVariantsPreview.svelte';

const meta = {
  title: 'Components/Dialog',
  component: DialogPreview,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof DialogPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false
  }
};

export const Open: Story = {
  args: {
    open: true
  }
};

export const Variants = {
  render: () => ({
    Component: DialogVariantsPreview
  })
};
