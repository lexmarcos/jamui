<script lang="ts">
  import Separator from '../lib/components/Separator.svelte';
  import type { SeparatorOrientation, SeparatorSize, SeparatorVariant } from '../lib/components/separator';

  type PreviewProps = {
    orientation?: SeparatorOrientation;
    size?: SeparatorSize;
    variant?: SeparatorVariant;
    decorative?: boolean;
  };

  let {
    orientation = 'horizontal',
    size = 'md',
    variant = 'default',
    decorative = false,
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 8rem; background: var(--color-jam-bg); padding: 2rem; display: flex; flex-direction: column; justify-content: center; gap: 1rem;"
>
  <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">ABOVE</span>
  <Separator {orientation} {size} {variant} {decorative} />
  <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">BELOW</span>
</div>
