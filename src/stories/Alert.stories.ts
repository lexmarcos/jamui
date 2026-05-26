import type { Meta, StoryObj } from '@storybook/sveltekit';

import AlertPreview from './AlertPreview.svelte';
import AlertVariantsPreview from './AlertVariantsPreview.svelte';

const meta = {
  title: 'Components/Alert',
  component: AlertPreview,
  args: {
    description: 'Sua sessao expira em 5 minutos. Salve seu trabalho.',
    dismissible: false,
    title: 'Atencao',
    variant: 'info',
    visible: true
  },
  argTypes: {
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'danger']
    },
    visible: { control: 'boolean' }
  }
} satisfies Meta<typeof AlertPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => ({
    Component: AlertVariantsPreview,
    props: args
  })
};

export const Dismissible: Story = {
  args: {
    dismissible: true
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Sucesso',
    description: 'Arquivo enviado com sucesso. Processando em segundo plano.'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Aviso',
    description: 'Espaco em disco abaixo de 10%. Considere limpar arquivos.'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Erro',
    description: 'Falha na conexao. Verifique sua rede e tente novamente.'
  }
};
