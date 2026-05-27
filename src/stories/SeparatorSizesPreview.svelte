<script lang="ts">
  import Separator from '../lib/components/Separator.svelte';
  import type { SeparatorSize } from '../lib/components/separator';

  type PreviewProps = { size?: SeparatorSize; variant?: string; orientation?: string; decorative?: boolean };
  let { size: _s, variant: _v, orientation: _o, decorative: _d }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 16rem; background: var(--color-jam-bg); padding: 2rem; display: flex; flex-direction: column; gap: 2rem;"
>
  <div class="flex flex-col gap-2">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">SM</span>
    <Separator size="sm" />
  </div>
  <div class="flex flex-col gap-2">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">MD</span>
    <Separator size="md" />
  </div>
  <div class="flex flex-col gap-2">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">LG</span>
    <Separator size="lg" />
  </div>
</div>
