<script lang="ts">
  import { getContext } from 'svelte';
  import { TABLE_CONTEXT, type TableContext, type TableRowProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableRowProps = $props();

  const ctx = getContext<TableContext>(TABLE_CONTEXT);
  const size = $derived(ctx?.size ?? 'md');
  const striped = $derived(ctx?.striped ?? false);

  const heightClass = $derived(
    size === 'compact' ? 'h-8'
    : size === 'sm' ? 'h-10'
    : 'h-12'
  );

  const stripedClass = $derived(striped ? 'even:bg-jam-text/5' : '');
</script>

<tr
  {...rest}
  class={`${heightClass} border-b border-jam-text/10 transition-colors duration-150 hover:bg-jam-text/10 ${stripedClass} ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</tr>
