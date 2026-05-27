<script lang="ts">
  import { Popover, PopoverClose, Button, Badge } from '../lib';
  import type { PopoverPosition, PopoverAlign, PopoverTriggerProps } from '../lib/components/popover';

  type PopoverPreviewProps = {
    position?: PopoverPosition;
    align?: PopoverAlign;
  };

  let {
    position = 'bottom',
    align = 'center'
  }: PopoverPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 20rem; background: var(--color-jam-bg); padding: 4rem; display: flex; align-items: center; justify-content: center;"
>
  <Popover {position} {align}>
    {#snippet trigger(props: PopoverTriggerProps)}
      <Button {...props} variant="secondary" size="md">Detalhes</Button>
    {/snippet}

    <div class="flex items-start justify-between gap-3">
      <div class="grid gap-2 text-xs">
        <div class="flex items-center gap-2">
          <Badge size="sm" variant="info" style="soft">INFO</Badge>
          <span class="font-bold uppercase tracking-[0.1em]">Recurso</span>
        </div>
        <p class="max-w-[14rem] leading-relaxed text-jam-bg/70">
          Informacoes contextuais sobre o recurso selecionado. Use Popover para exibir conteudo rico sem sair da pagina.
        </p>
      </div>
      <PopoverClose />
    </div>
  </Popover>
</div>
