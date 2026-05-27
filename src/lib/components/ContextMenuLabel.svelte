<script lang="ts">
  import type { ContextMenuLabelProps } from './context-menu';

  let {
    children,
    class: className = '',
    ...rest
  }: ContextMenuLabelProps = $props();
</script>

<div
  {...rest}
  class={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-jam-bg/50 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
