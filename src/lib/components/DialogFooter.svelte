<script lang="ts">
  import type { DialogFooterProps } from './dialog-base';

  let {
    children,
    class: className = '',
    ...rest
  }: DialogFooterProps = $props();

  const baseClass = 'mt-4 flex justify-end gap-3';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<div {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</div>
