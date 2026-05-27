<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { CONTEXT_MENU_ROOT, type ContextMenuRootContext } from './context-menu';

  type Props = {
    children?: Snippet;
  };

  let {
    children,
  }: Props = $props();

  let open = $state(false);
  let position = $state({ x: 0, y: 0 });

  function setOpen(value: boolean) {
    open = value;
  }

  function setPosition(x: number, y: number) {
    position = { x, y };
  }

  function closeAll() {
    open = false;
  }

  setContext<ContextMenuRootContext>(CONTEXT_MENU_ROOT, {
    get open() { return open; },
    get position() { return position; },
    setOpen,
    setPosition,
    closeAll
  });
</script>

{#if children}
  {@render children()}
{/if}
