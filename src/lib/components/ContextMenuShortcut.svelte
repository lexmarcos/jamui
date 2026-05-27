<script lang="ts">
  import type { ContextMenuShortcutProps } from './context-menu';

  let {
    children,
    class: className = '',
    ...rest
  }: ContextMenuShortcutProps = $props();
</script>

<span
  {...rest}
  class={`ml-auto pl-4 text-[10px] font-medium tracking-[0.1em] text-jam-bg/40 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</span>
