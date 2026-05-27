import type { Meta, StoryObj } from '@storybook/sveltekit';
import DialogPreview from './DialogPreview.svelte';
import DialogVariantsPreview from './DialogVariantsPreview.svelte';

const meta = {
  title: 'Components/Dialog',
  component: DialogPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dialog e um modal acessivel para confirmacoes, formularios curtos e fluxos bloqueantes. Ele gerencia foco, restaura foco ao fechar, associa titulo/descricao via ARIA e suporta fechamento por Escape, overlay ou DialogClose.'
      }
    }
  },
  args: {
    cancelLabel: 'Cancelar',
    closeOnOverlayClick: true,
    confirmLabel: 'Confirmar',
    description: 'Dialog modal com titulo, descricao, acoes e gerenciamento de foco. Fecha por Escape, overlay ou acoes explicitas.',
    modal: true,
    open: false,
    size: 'md',
    title: 'Confirmar operacao',
    triggerLabel: 'Abrir dialog'
  },
  argTypes: {
    cancelLabel: {
      control: 'text',
      description: 'Texto do botao secundario renderizado dentro de DialogClose.'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Define se clicar no overlay fecha o dialog. Use false para fluxos criticos.'
    },
    confirmLabel: {
      control: 'text',
      description: 'Texto do botao primario renderizado dentro de DialogClose.'
    },
    description: {
      control: 'text',
      description: 'Conteudo de DialogDescription. E associado ao dialog via aria-describedby.'
    },
    modal: {
      control: 'boolean',
      description: 'Quando true, DialogContent recebe aria-modal="true".'
    },
    open: {
      control: 'boolean',
      description: 'Estado controlado do dialog. Use bind:open para controlar externamente.'
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Largura maxima do DialogContent.'
    },
    title: {
      control: 'text',
      description: 'Conteudo de DialogTitle. E associado ao dialog via aria-labelledby.'
    },
    triggerLabel: {
      control: 'text',
      description: 'Texto do trigger usado no exemplo interativo.'
    }
  }
} satisfies Meta<typeof DialogPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use esta story para testar estado aberto, tamanho, modal e fechamento por overlay.'
      },
      source: {
        code: `<Dialog bind:open>
  <DialogTrigger asChild>
    {#snippet child({ props })}
      <Button {...props}>Abrir dialog</Button>
    {/snippet}
  </DialogTrigger>
  <DialogPortal>
    <DialogContent size="md">
      <DialogHeader>
        <DialogTitle>Confirmar operacao</DialogTitle>
        <DialogDescription>Revise a acao antes de confirmar.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          {#snippet child({ props })}
            <Button {...props} variant="secondary">Cancelar</Button>
          {/snippet}
        </DialogClose>
        <DialogClose asChild>
          {#snippet child({ props })}
            <Button {...props}>Confirmar</Button>
          {/snippet}
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>`
      }
    }
  }
};

export const InitiallyOpen: Story = {
  args: {
    open: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo com o dialog aberto inicialmente para validar layout, foco e conteudo.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    description: 'Use para confirmacoes curtas com pouco conteudo.',
    size: 'sm',
    title: 'Dialog compacto'
  }
};

export const NoOverlayClose: Story = {
  args: {
    closeOnOverlayClick: false,
    description: 'Este dialog nao fecha ao clicar no overlay. Use em fluxos que exigem uma escolha explicita.',
    title: 'Acao obrigatoria'
  },
  parameters: {
    docs: {
      description: {
        story: 'Mantenha Escape e botoes explicitos como alternativas de fechamento.'
      }
    }
  }
};

export const Documentation: Story = {
  name: 'Examples and Guidance',
  render: () => ({
    Component: DialogVariantsPreview as typeof DialogPreview
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Guia visual com anatomia, tamanhos, formularios, confirmacoes, fluxo destrutivo e notas de acessibilidade.'
      }
    }
  }
};
