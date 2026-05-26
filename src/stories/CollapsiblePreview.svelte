<script lang="ts">
  import {
    Collapsible,
    CollapsibleTrigger,
    CollapsiblePanel,
    Badge
  } from '../lib';
  import type { CollapsibleVariant } from '../lib/components/collapsible';

  type CollapsiblePreviewProps = {
    open?: boolean;
    variant?: CollapsibleVariant;
  };

  let {
    open = false,
    variant = 'default'
  }: CollapsiblePreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Collapsible {open} {variant}>
    <CollapsibleTrigger>
      <span class="flex items-center gap-2">
        <Badge size="sm" variant="info" style="soft">3</Badge>
        Detalhes do Servidor
      </span>
    </CollapsibleTrigger>
    <CollapsiblePanel>
      <div class="grid gap-3 text-xs font-medium leading-relaxed text-jam-muted">
        <div class="flex justify-between border-b border-jam-text/10 pb-2">
          <span>Regiao</span>
          <span class="text-jam-text">us-east-1</span>
        </div>
        <div class="flex justify-between border-b border-jam-text/10 pb-2">
          <span>Instancia</span>
          <span class="text-jam-text">t3.medium</span>
        </div>
        <div class="flex justify-between border-b border-jam-text/10 pb-2">
          <span>Uptime</span>
          <span class="text-jam-text">99.97%</span>
        </div>
        <div class="flex justify-between">
          <span>Latencia</span>
          <span class="text-jam-text">24ms</span>
        </div>
      </div>
    </CollapsiblePanel>
  </Collapsible>
</div>
