<script lang="ts">
  import { getContext } from 'svelte';
  import { CONTEXT_MENU_ROOT, type ContextMenuRootContext, type ContextMenuTriggerProps } from './context-menu';

  let {
    children,
    class: className = '',
    ...rest
  }: ContextMenuTriggerProps = $props();

  const ctx = getContext<ContextMenuRootContext>(CONTEXT_MENU_ROOT);
  let triggerRef = $state<HTMLDivElement | null>(null);

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    ctx.setPosition(e.clientX, e.clientY);
    ctx.setOpen(true);
  }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.key === 'ContextMenu') || (e.key === 'F10' && e.shiftKey)) {
      e.preventDefault();
      const rect = triggerRef?.getBoundingClientRect();
      if (rect) {
        ctx.setPosition(rect.left, rect.bottom);
      }
      ctx.setOpen(true);
    }
  }

  const mergedClass = $derived(`inline-block ${className}`.trim());
</script>

<div
  bind:this={triggerRef}
  {...rest}
  class={mergedClass}
  oncontextmenu={handleContextMenu}
  onkeydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-haspopup="menu"
  aria-expanded={ctx.open}
>
  {#if children}
    {@render children()}
  {/if}
</div>
