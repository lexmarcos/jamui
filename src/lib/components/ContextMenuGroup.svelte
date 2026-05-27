<script lang="ts">
  import type { ContextMenuGroupProps } from './context-menu';

  let {
    children,
    class: className = '',
    ...rest
  }: ContextMenuGroupProps = $props();
</script>

<div {...rest} role="group" class={className}>
  {#if children}
    {@render children()}
  {/if}
</div>
