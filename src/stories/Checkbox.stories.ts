import type { Meta, StoryObj } from '@storybook/sveltekit';

import CheckboxPreview from './CheckboxPreview.svelte';

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxPreview,
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: 'Aceito os termos de uso'
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' }
  }
} satisfies Meta<typeof CheckboxPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true
  }
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true
  }
};
