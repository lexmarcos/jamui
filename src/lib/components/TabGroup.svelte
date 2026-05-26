<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { TAB_CONTEXT, type TabGroupProps } from './tab';

  let {
    children,
    class: className = '',
    orientation = 'horizontal',
    size = 'md',
    value = $bindable(''),
    variant = 'default',
    ...rest
  }: TabGroupProps = $props();

  const layoutClass = $derived(
    orientation === 'vertical' ? 'flex' : ''
  );

  setContext(TAB_CONTEXT, {
    get activeTab() { return value; },
    setTab: (v: string) => { value = v; },
    get variant() { return variant; },
    get orientation() { return orientation; },
    get size() { return size; }
  });
</script>

<div {...rest} class={`${layoutClass} ${className}`.trim()}>
  {#if children}
    {@render children()}
  {/if}
</div>
