<script lang="ts">
  import { getContext, setContext, tick } from 'svelte';
  import {
    CONTEXT_MENU_ROOT,
    CONTEXT_MENU_CONTENT,
    type ContextMenuRootContext,
    type ContextMenuContentContext,
    type ContextMenuContentProps,
  } from './context-menu';

  let {
    children,
    class: className = '',
    alignOffset = 0,
    sideOffset = 0,
    ...rest
  }: ContextMenuContentProps = $props();

  const rootCtx = getContext<ContextMenuRootContext>(CONTEXT_MENU_ROOT);

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

  function getFirstEnabled(): number {
    return items.findIndex((el) => !el.disabled);
  }

  function getLastEnabled(): number {
    const idx = [...items].findLastIndex((el) => !el.disabled);
    return idx;
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

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node;
    const targetElement = target instanceof Element ? target : target.parentElement;
    if (menuRef?.contains(target) || targetElement?.closest('[data-context-menu-layer]')) return;
    close();
  }

  function calculatePosition() {
    const { x, y } = rootCtx.position;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x + sideOffset;
    let top = y + sideOffset;

    tick().then(() => {
      if (!menuRef) return;
      const rect = menuRef.getBoundingClientRect();

      if (left + rect.width > vw - 8) {
        left = vw - rect.width - 8;
      }
      if (top + rect.height > vh - 8) {
        top = vh - rect.height - 8;
      }
      if (left < 8) left = 8;
      if (top < 8) top = 8;

      positionStyle = `left: ${left}px; top: ${top}px;`;
    });
  }

  $effect(() => {
    if (rootCtx.open) {
      visible = true;
      positionStyle = `left: ${rootCtx.position.x}px; top: ${rootCtx.position.y}px;`;
      calculatePosition();
      activeIndex = -1;

      tick().then(() => {
        if (!menuRef) return;
        animating = true;
        menuRef.focus();
        const first = getFirstEnabled();
        if (first !== -1) {
          // Don't auto-focus first item, just allow keyboard nav
        }
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

  setContext<ContextMenuContentContext>(CONTEXT_MENU_CONTENT, {
    get registerItem() { return registerItem; },
    get unregisterItem() { return unregisterItem; },
    get activeIndex() { return activeIndex; },
    setActiveIndex,
    get close() { return close; },
    get menuRef() { return menuRef; },
  });

  const baseClass =
    'fixed z-[9999] min-w-[12rem] border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm transition-all duration-150 ease-out';

  const animClass = $derived(
    animating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
  );
</script>

<svelte:window onclick={handleClickOutside} />

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
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
