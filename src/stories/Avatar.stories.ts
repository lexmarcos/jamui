import type { Meta, StoryObj } from '@storybook/sveltekit';

import AvatarPreview from './AvatarPreview.svelte';
import AvatarSizesPreview from './AvatarSizesPreview.svelte';
import AvatarFallbackPreview from './AvatarFallbackPreview.svelte';

const meta = {
  title: 'Components/Avatar',
  component: AvatarPreview,
  args: {
    size: 'md',
    src: 'https://picsum.photos/200',
    alt: 'User avatar'
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl']
    },
    src: { control: 'text' },
    alt: { control: 'text' }
  }
} satisfies Meta<typeof AvatarPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => ({
    Component: AvatarSizesPreview,
    props: args
  })
};

export const Fallback: Story = {
  render: (args) => ({
    Component: AvatarFallbackPreview,
    props: args
  })
};
