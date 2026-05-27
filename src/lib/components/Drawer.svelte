<script lang="ts">
  import { setContext, tick } from 'svelte';
  import { DRAWER_CONTEXT, type DrawerProps } from './drawer';

  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let {
    children,
    class: className = '',
    open = $bindable(false),
    position = 'right',
    trigger,
    'aria-label': ariaLabel = 'Painel',
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: DrawerProps = $props();

  const contentId = `drawer-${Math.random().toString(36).slice(2, 9)}`;

  let triggerRef = $state<HTMLElement | null>(null);
  let contentRef = $state<HTMLDivElement | null>(null);
  let visible = $state(false);
  let animating = $state(false);
  let previousActiveElement = $state<Element | null>(null);
  let wasOpen = $state(false);

  const positionClass = $derived(
    position === 'left'
      ? 'bottom-0 left-0 top-0 w-full max-w-sm'
      : position === 'right'
        ? 'bottom-0 right-0 top-0 w-full max-w-sm'
        : position === 'top'
          ? 'left-0 right-0 top-0 h-full max-h-80'
          : 'bottom-0 left-0 right-0 h-full max-h-80'
  );

  const hiddenTransformClass = $derived(
    position === 'left'
      ? '-translate-x-full'
      : position === 'right'
        ? 'translate-x-full'
        : position === 'top'
          ? '-translate-y-full'
          : 'translate-y-full'
  );

  function setOpen(v: boolean) {
    open = v;
  }

  function openDrawer() {
    open = true;
  }

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  }

  function handlePanelKeydown(e: KeyboardEvent) {
    if (!open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }

    if (e.key !== 'Tab' || !contentRef) return;

    const focusable = Array.from(contentRef.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusable.length === 0) {
      e.preventDefault();
      contentRef.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || !contentRef.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !contentRef.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      close();
    }
  }

  function handleTriggerClick(e: MouseEvent) {
    e.stopPropagation();
    openDrawer();
  }

  function handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDrawer();
    }
  }

  function focusDrawer() {
    const firstFocusable = contentRef?.querySelector<HTMLElement>(focusableSelector);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      contentRef?.focus();
    }
  }

  $effect(() => {
    if (open) {
      previousActiveElement = document.activeElement;
      wasOpen = true;
      visible = true;
      tick().then(() => {
        if (!open) return;
        animating = true;
        tick().then(() => {
          if (open) focusDrawer();
        });
      });
    } else {
      animating = false;
      if (wasOpen) {
        wasOpen = false;
        const elementToRestore = previousActiveElement;
        previousActiveElement = null;
        if (elementToRestore instanceof HTMLElement && elementToRestore.isConnected) {
          elementToRestore.focus();
        } else {
          triggerRef?.focus();
        }
      }
      const timer = setTimeout(() => {
        if (!open) visible = false;
      }, 300);
      return () => clearTimeout(timer);
    }
  });

  setContext(DRAWER_CONTEXT, {
    get open() { return open; },
    get position() { return position; },
    setOpen,
    close
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div {...rest} class={`${className}`.trim()}>
  {@render trigger({
    onclick: handleTriggerClick,
    onkeydown: handleTriggerKeydown,
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': contentId,
    ref: (el) => { triggerRef = el; }
  })}

  {#if visible}
    <div
      class={`fixed inset-0 z-40 bg-jam-bg/70 transition-opacity duration-300 ease-out ${
        animating ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden="true"
      onclick={handleOverlayClick}
    ></div>

    <div
      bind:this={contentRef}
      id={contentId}
      role="dialog"
      aria-modal={open ? 'true' : undefined}
      aria-hidden={open ? undefined : 'true'}
      aria-label={open && !ariaLabelledby ? ariaLabel : undefined}
      aria-labelledby={open ? ariaLabelledby : undefined}
      tabindex="-1"
      class={`fixed z-50 flex flex-col overflow-auto bg-jam-text font-jam-mono text-jam-bg shadow-jam-hard-blue-md transition-transform duration-300 ease-out ${
        animating ? 'translate-x-0 translate-y-0' : hiddenTransformClass
      } ${open ? '' : 'pointer-events-none'} ${positionClass}`.trim()}
      onkeydown={handlePanelKeydown}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>
