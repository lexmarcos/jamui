<script lang="ts">
  import { setContext, tick, type Snippet } from 'svelte';
  import { DROPDOWN_CONTEXT, type DropdownTriggerProps } from './dropdown';

  type DropdownProps = {
    children?: Snippet;
    trigger: Snippet<[DropdownTriggerProps]>;
    class?: string;
    align?: 'start' | 'end';
  };

  let {
    children,
    trigger,
    class: className = '',
    align = 'start'
  }: DropdownProps = $props();

  let open = $state(false);
  let triggerRef = $state<HTMLElement | null>(null);
  let menuRef = $state<HTMLDivElement | null>(null);
  let items: HTMLButtonElement[] = [];
  let activeIndex = $state(-1);

  const alignClass = $derived(align === 'end' ? 'right-0' : 'left-0');

  function registerItem(node: HTMLButtonElement, disabled: boolean) {
    const currentIndex = items.indexOf(node);
    if (currentIndex !== -1) return currentIndex;

    const index = items.length;
    items = [...items, node];
    return index;
  }

  function unregisterItem(node: HTMLButtonElement) {
    const index = items.indexOf(node);
    if (index === -1) return;

    items = items.filter((item) => item !== node);
    if (activeIndex === index) {
      activeIndex = -1;
    } else if (activeIndex > index) {
      activeIndex -= 1;
    }
  }

  function clearActiveIndex() {
    activeIndex = -1;
    if (items.includes(document.activeElement as HTMLButtonElement)) {
      menuRef?.focus();
    }
  }

  function setActiveIndex(index: number) {
    if (index < 0) {
      clearActiveIndex();
      return;
    }

    activeIndex = index;
    if (items[index]) {
      items[index].focus();
    }
  }

  function close() {
    open = false;
    activeIndex = -1;
    triggerRef?.focus();
  }

  function openMenu() {
    open = true;
    activeIndex = -1;
    tick().then(() => {
      if (!open) return;
      menuRef?.focus();
      const firstEnabled = items.findIndex((_, i) => !items[i]?.disabled);
      if (firstEnabled !== -1) {
        setActiveIndex(firstEnabled);
      }
    });
  }

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    if (open) close();
    else openMenu();
  }

  function handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMenu();
    }
  }

  function handleMenuKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items.findIndex((_, i) => i > activeIndex && !items[i]?.disabled);
      if (next !== -1) setActiveIndex(next);
      else {
        const first = items.findIndex((_, i) => !items[i]?.disabled);
        if (first !== -1) setActiveIndex(first);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = [...items].findLastIndex((_, i) => i < activeIndex && !items[i]?.disabled);
      if (prev !== -1) setActiveIndex(prev);
      else {
        const last = [...items].findLastIndex((_, i) => !items[i]?.disabled);
        if (last !== -1) setActiveIndex(last);
      }
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      const first = items.findIndex((_, i) => !items[i]?.disabled);
      if (first !== -1) setActiveIndex(first);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      const last = [...items].findLastIndex((_, i) => !items[i]?.disabled);
      if (last !== -1) setActiveIndex(last);
      return;
    }

    if (e.key === 'Tab') {
      close();
      return;
    }
  }

  function handleMenuMouseMove(e: MouseEvent) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const item = target.closest<HTMLButtonElement>('button[role="menuitem"]');
    if (!item || item.disabled) {
      clearActiveIndex();
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (menuRef && !menuRef.contains(target) && (!triggerRef || !triggerRef.contains(target))) {
      close();
    }
  }

  setContext(DROPDOWN_CONTEXT, {
    get registerItem() { return registerItem; },
    get unregisterItem() { return unregisterItem; },
    get activeIndex() { return activeIndex; },
    setActiveIndex,
    close
  });
</script>

<svelte:window onclick={handleClickOutside} />

<div class={`relative inline-block ${className}`.trim()}>
  {@render trigger({
    onclick: toggle,
    onkeydown: handleTriggerKeydown,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    ref: (el) => { triggerRef = el; }
  })}

  {#if open}
    <div
      bind:this={menuRef}
      role="menu"
      tabindex={-1}
      class="absolute z-50 mt-1.5 min-w-[12rem] border border-jam-bg/15 bg-jam-text py-1 shadow-jam-hard-blue-sm {alignClass}"
      onkeydown={handleMenuKeydown}
      onmousemove={handleMenuMouseMove}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>
