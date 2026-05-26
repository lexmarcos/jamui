<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { COLLAPSIBLE_CONTEXT, type CollapsibleProps } from './collapsible';

  let {
    children,
    class: className = '',
    open = $bindable(false),
    variant = 'default',
    ...rest
  }: CollapsibleProps = $props();

  const panelId = `collapsible-panel-${Math.random().toString(36).slice(2, 9)}`;

  function toggle() {
    open = !open;
  }

  setContext(COLLAPSIBLE_CONTEXT, {
    get open() { return open; },
    toggle,
    get panelId() { return panelId; },
    get variant() { return variant; }
  });
</script>

<div {...rest} class={`${className}`.trim()}>
  {#if children}
    {@render children()}
  {/if}
</div>
