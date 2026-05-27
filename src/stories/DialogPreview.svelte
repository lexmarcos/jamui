<script lang="ts">
  import Button from '../lib/components/Button.svelte';
  import Dialog from '../lib/components/Dialog.svelte';
  import DialogClose from '../lib/components/DialogClose.svelte';
  import DialogContent from '../lib/components/DialogContent.svelte';
  import DialogDescription from '../lib/components/DialogDescription.svelte';
  import DialogFooter from '../lib/components/DialogFooter.svelte';
  import DialogHeader from '../lib/components/DialogHeader.svelte';
  import DialogPortal from '../lib/components/DialogPortal.svelte';
  import DialogTitle from '../lib/components/DialogTitle.svelte';
  import DialogTrigger from '../lib/components/DialogTrigger.svelte';
  import type { DialogSize } from '../lib/components/dialog-base';

  type DialogPreviewProps = {
    cancelLabel?: string;
    closeOnOverlayClick?: boolean;
    confirmLabel?: string;
    description?: string;
    modal?: boolean;
    open?: boolean;
    size?: DialogSize;
    title?: string;
    triggerLabel?: string;
  };

  let {
    cancelLabel = 'Cancelar',
    closeOnOverlayClick = true,
    confirmLabel = 'Confirmar',
    description = 'Dialog modal com titulo, descricao, acoes e gerenciamento de foco. Fecha por Escape, overlay ou acoes explicitas.',
    modal = true,
    open = $bindable(false),
    size = 'md',
    title = 'Confirmar operacao',
    triggerLabel = 'Abrir dialog'
  }: DialogPreviewProps = $props();
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-8">
  <div class="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
    <section class="grid gap-5 border border-jam-text/20 bg-jam-surface p-5 shadow-jam-hard-sm">
      <div class="grid gap-2">
        <p class="text-[10px] font-black uppercase tracking-[0.22em] text-jam-soft">Componente</p>
        <h1 class="text-2xl font-black uppercase tracking-[0.12em] text-jam-text">Dialog</h1>
        <p class="max-w-2xl text-xs font-medium leading-relaxed text-jam-muted">
          Use Dialog para confirmar acoes, coletar informacoes curtas ou exibir fluxos que precisam bloquear a tela atual.
          O conteudo e renderizado em portal, recebe foco automaticamente e restaura o foco no trigger ao fechar.
        </p>
      </div>

      <Dialog bind:open {modal}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">{triggerLabel}</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent {size} {closeOnOverlayClick}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">{cancelLabel}</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="primary">{confirmLabel}</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </section>

    <aside class="grid gap-3 border border-jam-text/20 bg-jam-input p-4 text-xs text-jam-muted">
      <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-jam-text">Notas de uso</h2>
      <p>Componha sempre com <code class="text-jam-text">DialogTrigger</code>, <code class="text-jam-text">DialogPortal</code> e <code class="text-jam-text">DialogContent</code>.</p>
      <p>Use <code class="text-jam-text">DialogTitle</code> e <code class="text-jam-text">DialogDescription</code> para preencher <code class="text-jam-text">aria-labelledby</code> e <code class="text-jam-text">aria-describedby</code>.</p>
      <p>Para botoes JamUI, use <code class="text-jam-text">asChild</code> e o snippet <code class="text-jam-text">child</code>.</p>
    </aside>
  </div>
</div>
