<script lang="ts">
  import type { AlertDialogHeaderProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogHeaderProps = $props();

  const baseClass = 'flex flex-col gap-1';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<div {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</div>
