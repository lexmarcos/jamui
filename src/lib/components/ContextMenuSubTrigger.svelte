<script lang="ts">
  import { ChevronRight } from '@lucide/svelte';
  import { getContext } from 'svelte';
  import {
    CONTEXT_MENU_CONTENT,
    CONTEXT_MENU_SUB,
    type ContextMenuContentContext,
    type ContextMenuSubContext,
    type ContextMenuSubTriggerProps,
  } from './context-menu';

  let {
    children,
    class: className = '',
    disabled = false,
    ...rest
  }: ContextMenuSubTriggerProps = $props();

  const ctx = getContext<ContextMenuContentContext>(CONTEXT_MENU_CONTENT);
  const subCtx = getContext<ContextMenuSubContext>(CONTEXT_MENU_SUB);
  let itemRef = $state<HTMLButtonElement | null>(null);
  let index = $state(-1);

  $effect(() => {
    const node = itemRef;
    if (node && ctx) {
      index = ctx.registerItem(node, disabled);
      return () => {
        ctx.unregisterItem(node);
      };
    }
  });

  function handleMouseEnter() {
    if (!ctx || disabled) return;
    ctx.setActiveIndex(index);
    subCtx?.setOpen(true);
  }

  function handleMouseLeave() {
    if (!ctx) return;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      subCtx?.setOpen(true);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      subCtx?.setOpen(false);
    }
  }

  const baseClass =
    'relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] outline-none transition-colors duration-100';

  const enabledClass = 'text-jam-bg hover:bg-jam-bg hover:text-jam-text focus:bg-jam-bg focus:text-jam-text';
  const disabledClass = 'pointer-events-none cursor-not-allowed text-jam-bg/35';

  const mergedClass = $derived(
    `${baseClass} ${disabled ? disabledClass : enabledClass} ${className}`.trim()
  );
</script>

<button
  bind:this={itemRef}
  {...rest}
  role="menuitem"
  type="button"
  aria-haspopup="menu"
  aria-expanded={subCtx?.open ?? false}
  class={mergedClass}
  {disabled}
  tabindex={-1}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onkeydown={handleKeydown}
>
  <span class="flex-1 truncate text-left">
    {#if children}
      {@render children()}
    {/if}
  </span>
  <ChevronRight size={14} strokeWidth={2.5} class="shrink-0" aria-hidden="true" />
</button>
