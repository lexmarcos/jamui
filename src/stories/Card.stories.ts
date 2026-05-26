import type { Meta, StoryObj } from '@storybook/sveltekit';

import CardPreview from './CardPreview.svelte';
import CardVariantsPreview from './CardVariantsPreview.svelte';

const meta = {
  title: 'Components/Card',
  component: CardPreview,
  args: {
    variant: 'default'
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'bordered', 'elevated']
    }
  }
} satisfies Meta<typeof CardPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: CardVariantsPreview
  })
};

export const Filled: Story = {
  args: {
    variant: 'filled'
  }
};

export const Bordered: Story = {
  args: {
    variant: 'bordered'
  }
};

export const Elevated: Story = {
  args: {
    variant: 'elevated'
  }
};
