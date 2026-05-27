<script lang="ts">
  import Separator from '../lib/components/Separator.svelte';

  type PreviewProps = { size?: string; variant?: string; orientation?: string; decorative?: boolean };
  let { size: _s, variant: _v, orientation: _o, decorative: _d }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 12rem; background: var(--color-jam-bg); padding: 2rem; display: flex; gap: 1rem; align-items: stretch;"
>
  <div class="flex flex-col items-center gap-2 flex-1">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">SAVE</span>
    <span class="text-xs text-jam-soft">Ctrl+S</span>
  </div>
  <Separator orientation="vertical" />
  <div class="flex flex-col items-center gap-2 flex-1">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">COPY</span>
    <span class="text-xs text-jam-soft">Ctrl+C</span>
  </div>
  <Separator orientation="vertical" variant="muted" />
  <div class="flex flex-col items-center gap-2 flex-1">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">PASTE</span>
    <span class="text-xs text-jam-soft">Ctrl+V</span>
  </div>
</div>
