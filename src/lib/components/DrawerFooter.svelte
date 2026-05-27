<script lang="ts">
  import type { DrawerFooterProps } from './drawer';

  let {
    children,
    class: className = '',
    ...rest
  }: DrawerFooterProps = $props();
</script>

<div
  {...rest}
  class={`flex items-center justify-end gap-2 border-t border-jam-bg/10 px-4 py-3 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
