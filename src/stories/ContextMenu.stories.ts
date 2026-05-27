import type { Meta, StoryObj } from '@storybook/sveltekit';

import ContextMenuPreview from './ContextMenuPreview.svelte';
import ContextMenuTablePreview from './ContextMenuTablePreview.svelte';
import ContextMenuCheckboxPreview from './ContextMenuCheckboxPreview.svelte';
import ContextMenuRadioPreview from './ContextMenuRadioPreview.svelte';
import ContextMenuSubPreview from './ContextMenuSubPreview.svelte';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenuPreview,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof ContextMenuPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Table: Story = {
  render: (args) => ({
    Component: ContextMenuTablePreview,
    props: args
  })
};

export const Checkbox: Story = {
  render: (args) => ({
    Component: ContextMenuCheckboxPreview,
    props: args
  })
};

export const RadioGroup: Story = {
  render: (args) => ({
    Component: ContextMenuRadioPreview,
    props: args
  })
};

export const Submenu: Story = {
  render: (args) => ({
    Component: ContextMenuSubPreview,
    props: args
  })
};
