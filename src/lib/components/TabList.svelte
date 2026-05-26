<script lang="ts">
  import { getContext } from 'svelte';
  import { TAB_CONTEXT, type TabContext, type TabListProps } from './tab';

  let {
    children,
    class: className = '',
    ...rest
  }: TabListProps = $props();

  const ctx = getContext<TabContext>(TAB_CONTEXT);
  const orientation = $derived(ctx?.orientation ?? 'horizontal');

  const layoutClass = $derived(
    orientation === 'vertical'
      ? 'flex-col border-r border-jam-bg/15'
      : 'flex-row border-b border-jam-bg/15'
  );
</script>

<div
  {...rest}
  role="tablist"
  class={`flex ${layoutClass} ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
