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
    subCtx?.setTriggerRef(node);

    if (node && ctx) {
      index = ctx.registerItem(node, disabled);
      return () => {
        ctx.unregisterItem(node);
        subCtx?.setTriggerRef(null);
      };
    }

    return () => {
      subCtx?.setTriggerRef(null);
    };
  });

  function openSubmenu() {
    if (!ctx || disabled) return;
    ctx.setActiveIndex(index);
    subCtx?.cancelClose();
    subCtx?.setOpen(true);
  }

  function handleClick(e: MouseEvent) {
    rest.onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented) return;
    openSubmenu();
  }

  function handleMouseEnter(e: MouseEvent) {
    rest.onmouseenter?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented) return;
    openSubmenu();
  }

  function handleMouseLeave(e: MouseEvent) {
    rest.onmouseleave?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented) return;
    subCtx?.scheduleClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    rest.onkeydown?.(e as KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented || disabled) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      openSubmenu();
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
  onclick={handleClick}
>
  <span class="flex min-w-0 flex-1 items-center gap-2 truncate text-left [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
    {#if children}
      {@render children()}
    {/if}
  </span>
  <ChevronRight size={14} strokeWidth={2.5} class="shrink-0" aria-hidden="true" />
</button>
