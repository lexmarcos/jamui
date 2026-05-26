<script lang="ts">
  import { getContext } from 'svelte';
  import { COLLAPSIBLE_CONTEXT, type CollapsibleContext, type CollapsiblePanelProps } from './collapsible';

  let {
    children,
    class: className = '',
    ...rest
  }: CollapsiblePanelProps = $props();

  const ctx = getContext<CollapsibleContext>(COLLAPSIBLE_CONTEXT);
  const isOpen = $derived(ctx?.open ?? false);

  let panelRef = $state<HTMLDivElement | null>(null);
  let contentHeight = $state(0);

  $effect(() => {
    if (panelRef) {
      contentHeight = panelRef.scrollHeight;
    }
  });
</script>

<div
  {...rest}
  id={ctx?.panelId}
  role="region"
  class="overflow-hidden transition-[height,opacity] duration-300 ease-out {className}"
  style="height: {isOpen ? contentHeight + 'px' : '0px'}; opacity: {isOpen ? 1 : 0};"
>
  <div bind:this={panelRef} class="px-3 pb-3 pt-1">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
