import type { Meta, StoryObj } from '@storybook/sveltekit';

import SwitchPreview from './SwitchPreview.svelte';
import SwitchSizesPreview from './SwitchSizesPreview.svelte';
import SwitchVariantsPreview from './SwitchVariantsPreview.svelte';

const meta = {
  title: 'Components/Switch',
  component: SwitchPreview,
  args: {
    checked: false,
    description: 'Alterna o estado da configuracao imediatamente',
    disabled: false,
    label: 'Sincronizacao ativa',
    size: 'md',
    variant: 'default'
  },
  argTypes: {
    checked: { control: 'boolean' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'success', 'warning', 'danger']
    }
  }
} satisfies Meta<typeof SwitchPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => ({
    Component: SwitchVariantsPreview,
    props: args
  })
};

export const Sizes: Story = {
  render: (args) => ({
    Component: SwitchSizesPreview,
    props: args
  })
};

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

export const Danger: Story = {
  args: {
    checked: true,
    label: 'Modo destrutivo',
    description: 'Habilita uma rotina sensivel',
    variant: 'danger'
  }
};
