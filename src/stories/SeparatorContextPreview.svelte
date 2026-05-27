<script lang="ts">
  import Separator from '../lib/components/Separator.svelte';

  type PreviewProps = { size?: string; variant?: string; orientation?: string; decorative?: boolean };
  let { size: _s, variant: _v, orientation: _o, decorative: _d }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 22rem; background: var(--color-jam-bg); padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem;"
>
  <div class="border border-jam-text/15 bg-jam-surface p-4 flex flex-col gap-1">
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">CARD TITLE</span>
    <span class="text-xs text-jam-soft">Some description text here.</span>
    <Separator decorative />
    <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">FOOTER</span>
  </div>

  <div class="flex gap-0">
    <div class="border border-jam-text/15 bg-jam-surface p-3 flex-1 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted text-center">ITEM A</div>
    <Separator orientation="vertical" decorative />
    <div class="border border-jam-text/15 bg-jam-surface p-3 flex-1 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted text-center">ITEM B</div>
  </div>

  <fieldset class="border border-jam-text/15 p-3 flex flex-col gap-2">
    <legend class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted px-1">SETTINGS</legend>
    <span class="text-xs text-jam-soft">Option one</span>
    <Separator decorative />
    <span class="text-xs text-jam-soft">Option two</span>
  </fieldset>
</div>
