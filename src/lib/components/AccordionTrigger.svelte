<script lang="ts">
  import { getContext } from 'svelte';
  import { ChevronDown } from '@lucide/svelte';
  import { ACCORDION_CONTEXT, ACCORDION_ITEM_CONTEXT, type AccordionTriggerProps, type AccordionContext, type AccordionItemContext, type AccordionHeadingLevel } from './accordion';

  let {
    children,
    class: className = '',
    headingLevel = 3,
    ...rest
  }: AccordionTriggerProps = $props();

  const ctx = getContext<AccordionContext>(ACCORDION_CONTEXT);
  const itemCtx = getContext<AccordionItemContext>(ACCORDION_ITEM_CONTEXT);
  const headingTag = $derived(`h${headingLevel}` as `h${AccordionHeadingLevel}`);

  function handleClick(e: MouseEvent) {
    rest.onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented || itemCtx?.disabled) return;

    if (itemCtx?.value) {
      ctx?.toggleItem(itemCtx.value);
    }
  }

  function focusSiblingTrigger(e: KeyboardEvent, direction: 'next' | 'previous' | 'first' | 'last') {
    const currentTrigger = e.currentTarget as HTMLButtonElement;
    const accordion = currentTrigger.closest('.jam-accordion');
    const triggers = Array.from(
      accordion?.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not(:disabled)') ?? []
    );
    const currentIndex = triggers.indexOf(currentTrigger);

    if (currentIndex === -1 || triggers.length === 0) return;

    e.preventDefault();

    const targetIndex =
      direction === 'first'
        ? 0
        : direction === 'last'
          ? triggers.length - 1
          : direction === 'next'
            ? (currentIndex + 1) % triggers.length
            : (currentIndex - 1 + triggers.length) % triggers.length;

    triggers[targetIndex]?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    rest.onkeydown?.(e as KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (e.defaultPrevented || itemCtx?.disabled) return;

    if (e.key === 'ArrowDown') {
      focusSiblingTrigger(e, 'next');
    } else if (e.key === 'ArrowUp') {
      focusSiblingTrigger(e, 'previous');
    } else if (e.key === 'Home') {
      focusSiblingTrigger(e, 'first');
    } else if (e.key === 'End') {
      focusSiblingTrigger(e, 'last');
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base'
  };
</script>

<svelte:element this={headingTag} class="m-0">
  <button
    {...rest}
    type="button"
    id={itemCtx?.triggerId}
    aria-expanded={itemCtx?.isOpen}
    aria-controls={itemCtx?.contentId}
    disabled={itemCtx?.disabled}
    data-accordion-trigger
    class={`jam-accordion-trigger flex w-full items-center justify-between font-jam-mono font-bold uppercase tracking-wide transition-colors ${
      sizeClasses[ctx?.size ?? 'md']
    } ${
      itemCtx?.disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer hover:bg-jam-surface'
    } ${className}`.trim()}
    onclick={handleClick}
    onkeydown={handleKeydown}
  >
    <span class="flex-1 text-left">
      {#if children}
        {@render children()}
      {/if}
    </span>
    <span class="ml-2 transition-transform duration-200 {itemCtx?.isOpen ? 'rotate-180' : ''}">
      {#if ctx?.icon}
        {@render ctx.icon(itemCtx?.isOpen ?? false)}
      {:else}
        <ChevronDown size={16} />
      {/if}
    </span>
  </button>
</svelte:element>
