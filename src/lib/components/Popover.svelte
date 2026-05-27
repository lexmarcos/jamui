<script lang="ts">
  import { setContext, tick } from 'svelte';
  import { POPOVER_CONTEXT, POPOVER_ANCHOR_CONTEXT, type PopoverProps } from './popover';

  let {
    children,
    trigger,
    class: className = '',
    open = $bindable(false),
    position = 'bottom',
    align = 'center',
    sideOffset = 8,
    alignOffset = 0,
    onopenchange,
  }: PopoverProps = $props();

  const contentId = `popover-${Math.random().toString(36).slice(2, 9)}`;

  let triggerRef = $state<HTMLElement | null>(null);
  let anchorRef = $state<HTMLElement | null>(null);
  let contentRef = $state<HTMLDivElement | null>(null);
  let visible = $state(false);
  let animating = $state(false);
  let posStyle = $state('');

  function close() {
    onopenchange?.(false);
    open = false;
  }

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    if (open) close();
    else open = true;
  }

  function handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open = true;
    }
  }

  function handleContentKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (!open) return;
    const target = e.target as Node;
    if (
      contentRef && !contentRef.contains(target) &&
      triggerRef && !triggerRef.contains(target)
    ) {
      close();
    }
  }

  function calcPosition() {
    const refEl = anchorRef || triggerRef;
    if (!refEl || !contentRef) return;

    const tRect = refEl.getBoundingClientRect();
    const cRect = contentRef.getBoundingClientRect();
    const gap = 4;

    let top = 0;
    let left = 0;
    let resolvedSide = position;

    if (position === 'bottom') {
      top = tRect.bottom + sideOffset;
      if (top + cRect.height > window.innerHeight - gap && tRect.top - sideOffset - cRect.height > gap) {
        resolvedSide = 'top';
        top = tRect.top - sideOffset - cRect.height;
      }
    } else if (position === 'top') {
      top = tRect.top - sideOffset - cRect.height;
      if (top < gap && tRect.bottom + sideOffset + cRect.height < window.innerHeight - gap) {
        resolvedSide = 'bottom';
        top = tRect.bottom + sideOffset;
      }
    } else if (position === 'left') {
      left = tRect.left - sideOffset - cRect.width;
      top = tRect.top + tRect.height / 2 - cRect.height / 2;
      if (left < gap && tRect.right + sideOffset + cRect.width < window.innerWidth - gap) {
        resolvedSide = 'right';
        left = tRect.right + sideOffset;
      }
    } else {
      left = tRect.right + sideOffset;
      top = tRect.top + tRect.height / 2 - cRect.height / 2;
      if (left + cRect.width > window.innerWidth - gap && tRect.left - sideOffset - cRect.width > gap) {
        resolvedSide = 'left';
        left = tRect.left - sideOffset - cRect.width;
      }
    }

    if (resolvedSide === 'top' || resolvedSide === 'bottom') {
      if (align === 'start') {
        left = tRect.left + alignOffset;
      } else if (align === 'end') {
        left = tRect.right - cRect.width - alignOffset;
      } else {
        left = tRect.left + tRect.width / 2 - cRect.width / 2 + alignOffset;
      }
    } else {
      if (align === 'start') {
        top = tRect.top + alignOffset;
      } else if (align === 'end') {
        top = tRect.bottom - cRect.height - alignOffset;
      } else {
        top = tRect.top + tRect.height / 2 - cRect.height / 2 + alignOffset;
      }
    }

    const vGap = 4;
    const hGap = 4;
    top = Math.max(vGap, Math.min(top, window.innerHeight - cRect.height - vGap));
    left = Math.max(hGap, Math.min(left, window.innerWidth - cRect.width - hGap));

    posStyle = `position:fixed;top:${top}px;left:${left}px;`;
  }

  $effect(() => {
    if (open) {
      visible = true;
      tick().then(() => {
        if (!open) return;
        calcPosition();
        animating = true;
        tick().then(() => {
          if (!open) return;
          contentRef?.focus();
        });
      });
    } else {
      animating = false;
      const timer = setTimeout(() => {
        if (!open) {
          visible = false;
          triggerRef?.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  });

  function handleResize() {
    if (open) calcPosition();
  }

  setContext(POPOVER_CONTEXT, {
    get close() { return close; }
  });

  setContext(POPOVER_ANCHOR_CONTEXT, {
    registerAnchor: (el: HTMLElement | null) => { anchorRef = el; }
  });

  const contentBase =
    'fixed z-50 w-max max-w-sm border border-jam-bg/15 bg-jam-text p-4 font-jam-mono text-jam-bg shadow-jam-hard-blue-sm transition-all duration-200 ease-out';
  const contentVisible = 'opacity-100 scale-100';
  const contentHidden = 'opacity-0 scale-95 pointer-events-none';
</script>

<svelte:window onclick={handleClickOutside} onresize={handleResize} />

<div class={`relative inline-block ${className}`.trim()}>
  {@render trigger({
    onclick: toggle,
    onkeydown: handleTriggerKeydown,
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': contentId,
    ref: (el) => { triggerRef = el; }
  })}
</div>

{#if visible}
  <div
    bind:this={contentRef}
    id={contentId}
    role="dialog"
    tabindex="-1"
    class={`${contentBase} ${animating ? contentVisible : contentHidden}`}
    style="{posStyle} outline: none;"
    onkeydown={handleContentKeydown}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
