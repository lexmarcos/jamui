<script lang="ts">
  import { Tooltip, Button } from '../lib';
  import type { TooltipPosition } from '../lib/components/tooltip';

  type TooltipPreviewProps = {
    content?: string;
    position?: TooltipPosition;
  };

  let {
    content = 'Salvar alteracoes no servidor',
    position = 'top'
  }: TooltipPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem; display: flex; align-items: center; justify-content: center;"
>
  <Tooltip {content} {position}>
    <Button variant="secondary" size="md">Salvar</Button>
  </Tooltip>
</div>
