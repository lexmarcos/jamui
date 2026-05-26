<script lang="ts">
  import { getContext } from 'svelte';
  import { TABLE_CONTEXT, type TableContext, type TableHeaderProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableHeaderProps = $props();

  const ctx = getContext<TableContext>(TABLE_CONTEXT);
  const size = $derived(ctx?.size ?? 'md');

  const padClass = $derived(
    size === 'compact' ? 'px-2 py-1'
    : size === 'sm' ? 'px-3 py-2'
    : 'px-4 py-3'
  );
</script>

<th
  {...rest}
  class={`${padClass} text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</th>
