<script lang="ts">
  import type { DialogHeaderProps } from './dialog-base';

  let {
    children,
    class: className = '',
    ...rest
  }: DialogHeaderProps = $props();

  const baseClass = 'flex flex-col gap-1';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<div {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</div>
