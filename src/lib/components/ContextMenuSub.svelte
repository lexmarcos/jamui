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
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  function cancelClose() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer = setTimeout(() => {
      open = false;
      closeTimer = undefined;
    }, 200);
  }

  function setOpen(value: boolean) {
    if (value) cancelClose();
    open = value;
  }

  function setTriggerRef(node: HTMLButtonElement | null) {
    triggerRef = node;
  }

  setContext<ContextMenuSubContext>(CONTEXT_MENU_SUB, {
    get open() { return open; },
    setOpen,
    get triggerRef() { return triggerRef; },
    setTriggerRef,
    scheduleClose,
    cancelClose,
  });

  $effect(() => {
    return () => cancelClose();
  });
</script>

{#if children}
  {@render children()}
{/if}
