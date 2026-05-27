import type { Meta, StoryObj } from '@storybook/sveltekit';
import AccordionPreview from './AccordionPreview.svelte';
import AccordionVariantsPreview from './AccordionVariantsPreview.svelte';

const meta = {
  title: 'Components/Accordion',
  component: AccordionPreview,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple']
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated', 'filled', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof AccordionPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    variant: 'default',
    size: 'md'
  }
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    variant: 'default',
    size: 'md'
  }
};

export const Bordered: Story = {
  args: {
    type: 'single',
    variant: 'bordered',
    size: 'md'
  }
};

export const Filled: Story = {
  args: {
    type: 'single',
    variant: 'filled',
    size: 'md'
  }
};

export const Small: Story = {
  args: {
    type: 'single',
    variant: 'default',
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    type: 'single',
    variant: 'default',
    size: 'lg'
  }
};

export const Variants = {
  render: () => ({
    Component: AccordionVariantsPreview
  })
};
