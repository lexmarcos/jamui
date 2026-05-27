import type { Meta, StoryObj } from '@storybook/sveltekit';

import SidebarPreview from './SidebarPreview.svelte';

const meta = {
  title: 'Components/Sidebar',
  component: SidebarPreview,
  parameters: { layout: 'fullscreen' },
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    defaultOpen: true,
    showSubmenu: true,
    showFooter: true,
    sample: 'full'
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right'] },
    variant: { control: 'inline-radio', options: ['sidebar', 'floating', 'inset'] },
    collapsible: { control: 'inline-radio', options: ['offcanvas', 'icon', 'none'] },
    defaultOpen: { control: 'boolean' },
    showSubmenu: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    sample: { control: 'inline-radio', options: ['minimal', 'compact', 'full'] }
  }
} satisfies Meta<typeof SidebarPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Basic: Story = {
  args: { sample: 'minimal', showSubmenu: false, showFooter: false }
};

export const WithGroups: Story = {
  args: { sample: 'full', showSubmenu: false }
};

export const WithSubmenus: Story = {
  args: { sample: 'full', showSubmenu: true }
};

export const Collapsible: Story = {
  args: { collapsible: 'offcanvas', defaultOpen: false }
};

export const IconMode: Story = {
  args: { collapsible: 'icon', defaultOpen: false }
};

export const RightSide: Story = {
  args: { side: 'right' }
};

export const Floating: Story = {
  args: { variant: 'floating' }
};

export const Inset: Story = {
  args: { variant: 'inset' }
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen'
  }
};

export const ActiveItem: Story = {
  args: { sample: 'full' }
};

export const WithUserFooter: Story = {
  args: { sample: 'compact', showFooter: true, showSubmenu: false }
};
