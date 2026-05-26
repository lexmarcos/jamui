<script lang="ts">
  import type { AlertDialogFooterProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogFooterProps = $props();

  const baseClass = 'mt-4 flex justify-end gap-3';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<div {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</div>
