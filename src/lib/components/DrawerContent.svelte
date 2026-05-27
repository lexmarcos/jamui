<script lang="ts">
  import type { DrawerContentProps } from './drawer';

  let {
    children,
    class: className = '',
    ...rest
  }: DrawerContentProps = $props();
</script>

<div
  {...rest}
  class={`flex flex-1 flex-col overflow-auto ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
