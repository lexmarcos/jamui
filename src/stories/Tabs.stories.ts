import type { Meta, StoryObj } from '@storybook/sveltekit';

import TabsPreview from './TabsPreview.svelte';
import TabsVariantsPreview from './TabsVariantsPreview.svelte';

const meta = {
  title: 'Components/Tabs',
  component: TabsPreview,
  args: {
    orientation: 'horizontal',
    size: 'md',
    value: 'general',
    variant: 'default'
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical']
    },
    size: {
      control: 'inline-radio',
      options: ['md', 'sm']
    },
    value: {
      control: 'inline-radio',
      options: ['general', 'security', 'network']
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'line']
    }
  }
} satisfies Meta<typeof TabsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: TabsVariantsPreview
  })
};

export const Line: Story = {
  args: {
    variant: 'line'
  }
};

export const Small: Story = {
  args: {
    size: 'sm'
  }
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical'
  }
};
