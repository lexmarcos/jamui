<script lang="ts">
  import { getContext, setContext, tick } from 'svelte';
  import {
    CONTEXT_MENU_CONTENT,
    CONTEXT_MENU_ROOT,
    CONTEXT_MENU_SUB,
    type ContextMenuRootContext,
    type ContextMenuContentContext,
    type ContextMenuSubContext,
    type ContextMenuSubContentProps,
  } from './context-menu';

  let {
    children,
    class: className = '',
    ...rest
  }: ContextMenuSubContentProps = $props();

  const rootCtx = getContext<ContextMenuRootContext>(CONTEXT_MENU_ROOT);
  const subCtx = getContext<ContextMenuSubContext>(CONTEXT_MENU_SUB);

  let menuRef = $state<HTMLDivElement | null>(null);
  let items: HTMLButtonElement[] = [];
  let activeIndex = $state(-1);
  let visible = $state(false);
  let animating = $state(false);
  let positionStyle = $state('');

  function registerItem(node: HTMLButtonElement, disabled: boolean) {
    const idx = items.indexOf(node);
    if (idx !== -1) return idx;
    items = [...items, node];
    return items.length - 1;
  }

  function unregisterItem(node: HTMLButtonElement) {
    const idx = items.indexOf(node);
    if (idx === -1) return;
    items = items.filter((item) => item !== node);
    if (activeIndex === idx) {
      activeIndex = -1;
    } else if (activeIndex > idx) {
      activeIndex -= 1;
    }
  }

  function setActiveIndex(index: number) {
    if (index < 0) {
      activeIndex = -1;
      return;
    }
    activeIndex = index;
    if (items[index]) {
      items[index].focus();
    }
  }

  function close() {
    rootCtx.closeAll();
  }

  function closeSub() {
    subCtx?.setOpen(false);
    subCtx?.triggerRef?.focus();
  }

  function getFirstEnabled(): number {
    return items.findIndex((el) => !el.disabled);
  }

  function getLastEnabled(): number {
    return [...items].findLastIndex((el) => !el.disabled);
  }

  function getNextEnabled(from: number): number {
    for (let i = from + 1; i < items.length; i++) {
      if (!items[i]?.disabled) return i;
    }
    return getFirstEnabled();
  }

  function getPrevEnabled(from: number): number {
    for (let i = from - 1; i >= 0; i--) {
      if (!items[i]?.disabled) return i;
    }
    return getLastEnabled();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      closeSub();
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(getNextEnabled(activeIndex));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(getPrevEnabled(activeIndex));
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(getFirstEnabled());
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(getLastEnabled());
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const active = items[activeIndex];
      if (active && !active.disabled) {
        active.click();
      }
      return;
    }
  }

  function handleMouseMove(e: MouseEvent) {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const item = target.closest<HTMLButtonElement>('button[role="menuitem"], button[role="menuitemcheckbox"], button[role="menuitemradio"]');
    if (!item || item.disabled) {
      setActiveIndex(-1);
    }
  }

  function calculatePosition() {
    if (!subCtx?.triggerRef || !menuRef) return;
    const triggerRect = subCtx.triggerRef.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const menuRect = menuRef.getBoundingClientRect();
    const menuW = menuRef.offsetWidth || menuRect.width || 160;
    const menuH = menuRef.offsetHeight || menuRect.height || 200;

    let left = triggerRect.right + 4;
    let top = triggerRect.top;

    if (left + menuW > vw - 8) {
      left = triggerRect.left - menuW - 4;
      if (left < 8) left = 8;
    }
    if (top + menuH > vh - 8) {
      top = vh - menuH - 8;
    }
    if (left + menuW > vw - 8) left = vw - menuW - 8;
    if (left < 8) left = 8;
    if (top < 8) top = 8;

    positionStyle = `left: ${left}px; top: ${top}px;`;
  }

  $effect(() => {
    if (subCtx?.open) {
      visible = true;
      activeIndex = -1;
      tick().then(() => {
        if (!menuRef) return;
        calculatePosition();
        animating = true;

        tick().then(() => {
          const first = getFirstEnabled();
          if (first !== -1) {
            setActiveIndex(first);
          } else {
            menuRef?.focus();
          }
        });
      });
    } else {
      animating = false;
      const timer = setTimeout(() => {
        visible = false;
        activeIndex = -1;
      }, 150);
      return () => clearTimeout(timer);
    }
  });

  function handleMouseLeave() {
    subCtx?.scheduleClose();
  }

  function handleMouseEnterContent() {
    subCtx?.cancelClose();
  }

  setContext<ContextMenuContentContext>(CONTEXT_MENU_CONTENT, {
    get registerItem() { return registerItem; },
    get unregisterItem() { return unregisterItem; },
    get activeIndex() { return activeIndex; },
    setActiveIndex,
    get close() { return close; },
    get menuRef() { return menuRef; },
  });

  const baseClass =
    'fixed z-[10000] min-w-[12rem] border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm transition-all duration-150 ease-out';

  const animClass = $derived(
    animating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
  );
</script>

{#if visible}
  <div
    {...rest}
    bind:this={menuRef}
    role="menu"
    tabindex="-1"
    data-context-menu-layer
    class={`${baseClass} ${animClass} ${className}`.trim()}
    style={positionStyle}
    onkeydown={handleKeydown}
    onmousemove={handleMouseMove}
    onmouseenter={handleMouseEnterContent}
    onmouseleave={handleMouseLeave}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
