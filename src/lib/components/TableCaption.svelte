<script lang="ts">
  import type { TableCaptionProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableCaptionProps = $props();
</script>

<caption
  {...rest}
  class={`caption-top mb-3 text-left text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</caption>
