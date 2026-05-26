<script lang="ts">
  import { getContext } from 'svelte';
  import { TABLE_CONTEXT, type TableContext, type TableCellProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableCellProps = $props();

  const ctx = getContext<TableContext>(TABLE_CONTEXT);
  const size = $derived(ctx?.size ?? 'md');

  const padClass = $derived(
    size === 'compact' ? 'px-2 py-1'
    : size === 'sm' ? 'px-3 py-2'
    : 'px-4 py-3'
  );
</script>

<td
  {...rest}
  class={`${padClass} text-xs font-medium tracking-[0.06em] text-jam-text ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</td>
