import type { Meta, StoryObj } from '@storybook/sveltekit';

import DataTablePreview from './DataTablePreview.svelte';

const meta = {
  title: 'Components/DataTable',
  component: DataTablePreview,
  parameters: { layout: 'fullscreen' },
  args: {
    density: 'comfortable',
    size: 'md',
    striped: false,
    selectable: true,
    sortable: true,
    pageable: true,
    pageSize: 8,
    filterable: true,
    showColumnVisibility: true,
    showDensityToggle: true,
    stickyHeader: true,
    loading: false,
    title: 'CI / Build Pipeline',
    description: 'Recent builds from the past 14 days. Filter, sort, and inspect runs across all regions.'
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['comfortable', 'compact', 'condensed'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    striped: { control: 'boolean' },
    selectable: { control: 'boolean' },
    sortable: { control: 'boolean' },
    pageable: { control: 'boolean' },
    pageSize: { control: { type: 'number', min: 1, max: 100 } },
    filterable: { control: 'boolean' },
    showColumnVisibility: { control: 'boolean' },
    showDensityToggle: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    loading: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' }
  }
} satisfies Meta<typeof DataTablePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Compact: Story = {
  args: { density: 'compact', pageSize: 12 }
};

export const Condensed: Story = {
  args: { density: 'condensed', pageSize: 18 }
};

export const Striped: Story = {
  args: { striped: true, density: 'compact', pageSize: 12 }
};

export const NoSelection: Story = {
  args: { selectable: false }
};

export const NoToolbar: Story = {
  args: {
    filterable: false,
    showColumnVisibility: false,
    showDensityToggle: false,
    selectable: false,
    title: '',
    description: ''
  }
};

export const ScrollableViewport: Story = {
  args: { maxHeight: '420px', density: 'compact', pageSize: 100 }
};

export const Loading: Story = {
  args: { loading: true }
};

export const Empty: Story = {
  args: { data: [], title: 'CI / Build Pipeline', description: 'Recent builds — none in window.' }
};

export const SmallSize: Story = {
  args: { size: 'sm', density: 'compact' }
};
