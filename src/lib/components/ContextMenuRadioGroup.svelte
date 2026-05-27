<script lang="ts">
  import { setContext } from 'svelte';
  import {
    CONTEXT_MENU_RADIO_GROUP,
    type ContextMenuRadioGroupProps,
  } from './context-menu';

  let {
    children,
    value,
    onvaluechange,
  }: ContextMenuRadioGroupProps = $props();

  setContext(CONTEXT_MENU_RADIO_GROUP, {
    get value() { return value; },
    onValueChange: (v: string) => {
      onvaluechange?.(v);
    }
  });
</script>

{#if children}
  {@render children()}
{/if}
