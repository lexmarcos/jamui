<script lang="ts">
  import { Popover, PopoverClose, PopoverAnchor, Button, Badge, TextInput } from '../lib';
  import type { PopoverTriggerProps, PopoverPosition, PopoverAlign } from '../lib/components/popover';
  import { Info, Settings, HelpCircle } from '@lucide/svelte';

  const positions: PopoverPosition[] = ['bottom', 'top', 'left', 'right'];
  const alignments: PopoverAlign[] = ['start', 'center', 'end'];
</script>

<div
  class="jamui-root"
  style="min-width: 28rem; min-height: 28rem; background: var(--color-jam-bg); padding: 3rem; display: grid; gap: 2rem; align-content: start;"
>
  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Posicoes</span>
    <div class="flex flex-wrap gap-2">
      {#each positions as pos}
        <Popover position={pos}>
          {#snippet trigger(props: PopoverTriggerProps)}
            <Button {...props} variant="secondary" size="sm">{pos}</Button>
          {/snippet}
          <div class="flex items-start justify-between gap-3">
            <p class="max-w-[12rem] text-xs leading-relaxed text-jam-bg/70">
              Popover posicionado na posicao <strong class="text-jam-bg">{pos}</strong>.
            </p>
            <PopoverClose />
          </div>
        </Popover>
      {/each}
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Alinhamentos</span>
    <div class="flex flex-wrap gap-2">
      {#each alignments as al}
        <Popover align={al}>
          {#snippet trigger(props: PopoverTriggerProps)}
            <Button {...props} variant="secondary" size="sm">{al}</Button>
          {/snippet}
          <div class="flex items-start justify-between gap-3">
            <p class="max-w-[12rem] text-xs leading-relaxed text-jam-bg/70">
              Alinhamento <strong class="text-jam-bg">{al}</strong> em relacao ao trigger.
            </p>
            <PopoverClose />
          </div>
        </Popover>
      {/each}
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Conteudo rico</span>
    <div class="flex flex-wrap gap-2">
      <Popover>
        {#snippet trigger(props: PopoverTriggerProps)}
          <Button {...props} variant="secondary" size="sm">
            <Info size={14} class="mr-1" /> Info
          </Button>
        {/snippet}
        <div class="grid gap-3" style="min-width: 14rem;">
          <div class="flex items-start justify-between gap-2">
            <span class="text-xs font-black uppercase tracking-[0.12em]">Detalhes do Servidor</span>
            <PopoverClose />
          </div>
          <div class="grid gap-1.5 border-t border-jam-bg/10 pt-2 text-xs">
            <div class="flex justify-between">
              <span class="text-jam-bg/60">Status</span>
              <Badge size="sm" variant="success" style="soft">Ativo</Badge>
            </div>
            <div class="flex justify-between">
              <span class="text-jam-bg/60">CPU</span>
              <span class="font-bold">42%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-jam-bg/60">Memoria</span>
              <span class="font-bold">2.1 GB</span>
            </div>
            <div class="flex justify-between">
              <span class="text-jam-bg/60">Regiao</span>
              <span class="font-bold">us-east-1</span>
            </div>
          </div>
        </div>
      </Popover>

      <Popover position="right" align="start">
        {#snippet trigger(props: PopoverTriggerProps)}
          <Button {...props} variant="secondary" size="sm">
            <Settings size={14} class="mr-1" /> Config
          </Button>
        {/snippet}
        <div class="grid gap-3" style="min-width: 14rem;">
          <div class="flex items-start justify-between gap-2">
            <span class="text-xs font-black uppercase tracking-[0.12em]">Configuracao</span>
            <PopoverClose />
          </div>
          <div class="grid gap-2 border-t border-jam-bg/10 pt-2">
            <TextInput placeholder="Nome do recurso" />
            <div class="flex gap-2">
              <Button size="sm" variant="primary">Salvar</Button>
              <Button size="sm" variant="secondary">Cancelar</Button>
            </div>
          </div>
        </div>
      </Popover>

      <Popover>
        {#snippet trigger(props: PopoverTriggerProps)}
          <Button {...props} variant="secondary" size="sm">
            <HelpCircle size={14} class="mr-1" /> Ajuda
          </Button>
        {/snippet}
        <div class="grid gap-2" style="min-width: 12rem;">
          <div class="flex items-start justify-between gap-2">
            <span class="text-xs font-black uppercase tracking-[0.12em]">Atalhos</span>
            <PopoverClose />
          </div>
          <div class="grid gap-1 border-t border-jam-bg/10 pt-2 text-xs">
            <div class="flex justify-between gap-4">
              <span class="text-jam-bg/60">Salvar</span>
              <kbd class="border border-jam-bg/20 bg-jam-bg/5 px-1.5 py-0.5 text-[10px] font-bold">Ctrl+S</kbd>
            </div>
            <div class="flex justify-between gap-4">
              <span class="text-jam-bg/60">Desfazer</span>
              <kbd class="border border-jam-bg/20 bg-jam-bg/5 px-1.5 py-0.5 text-[10px] font-bold">Ctrl+Z</kbd>
            </div>
            <div class="flex justify-between gap-4">
              <span class="text-jam-bg/60">Buscar</span>
              <kbd class="border border-jam-bg/20 bg-jam-bg/5 px-1.5 py-0.5 text-[10px] font-bold">Ctrl+K</kbd>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Com Anchor</span>
    <Popover position="bottom" align="start">
      {#snippet trigger(props: PopoverTriggerProps)}
        <Button {...props} variant="secondary" size="sm">Abrir via Anchor</Button>
      {/snippet}
      <PopoverAnchor>
        <div class="border border-jam-text/30 px-3 py-2 text-xs text-jam-text">
          Elemento ancora (posicionamento relativo a este bloco)
        </div>
      </PopoverAnchor>
      <div class="flex items-start justify-between gap-3">
        <p class="max-w-[12rem] text-xs leading-relaxed text-jam-bg/70">
          Este popover e posicionado relativo ao elemento ancora, nao ao trigger.
        </p>
        <PopoverClose />
      </div>
    </Popover>
  </div>
</div>
