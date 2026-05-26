<script lang="ts">
  import { getContext } from 'svelte';
  import { TAB_CONTEXT, type TabContext, type TabPanelProps } from './tab';

  let {
    children,
    class: className = '',
    value,
    ...rest
  }: TabPanelProps = $props();

  const ctx = getContext<TabContext>(TAB_CONTEXT);
  const isActive = $derived(ctx?.activeTab === value);
</script>

{#if isActive}
  <div
    {...rest}
    role="tabpanel"
    tabindex={0}
    class={`p-4 ${className}`.trim()}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
