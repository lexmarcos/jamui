import type { Meta, StoryObj } from '@storybook/sveltekit';

import BreadcrumbPreview from './BreadcrumbPreview.svelte';
import BreadcrumbVariantsPreview from './BreadcrumbVariantsPreview.svelte';

const meta = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbPreview
} satisfies Meta<typeof BreadcrumbPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: StoryObj = {
  render: () => ({
    Component: BreadcrumbVariantsPreview
  })
};
