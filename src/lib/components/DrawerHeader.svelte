<script lang="ts">
  import type { DrawerHeaderProps } from './drawer';

  let {
    children,
    class: className = '',
    ...rest
  }: DrawerHeaderProps = $props();
</script>

<div
  {...rest}
  class={`flex items-center justify-between border-b border-jam-bg/10 px-4 py-3 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
