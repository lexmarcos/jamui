<script lang="ts">
  import type { AlertDialogDescriptionProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogDescriptionProps = $props();

  const baseClass = 'text-xs font-medium leading-relaxed text-jam-bg/75';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<p {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</p>
