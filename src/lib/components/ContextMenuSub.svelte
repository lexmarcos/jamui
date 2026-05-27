<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { CONTEXT_MENU_SUB, type ContextMenuSubContext } from './context-menu';

  type Props = {
    children?: Snippet;
  };

  let {
    children,
  }: Props = $props();

  let open = $state(false);
  let triggerRef = $state<HTMLButtonElement | null>(null);

  function setOpen(value: boolean) {
    open = value;
  }

  setContext<ContextMenuSubContext>(CONTEXT_MENU_SUB, {
    get open() { return open; },
    setOpen,
    get triggerRef() { return triggerRef; },
  });
</script>

{#if children}
  {@render children()}
{/if}
