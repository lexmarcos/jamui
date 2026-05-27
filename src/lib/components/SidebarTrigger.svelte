<script lang="ts">
  import { getContext } from 'svelte';
  import { PanelLeft, PanelRight } from '@lucide/svelte';
  import {
    SIDEBAR_CONTEXT,
    type SidebarContext,
    type SidebarTriggerProps
  } from './sidebar';

  let {
    children,
    class: className = '',
    onclick,
    onkeydown,
    'aria-label': ariaLabel,
    ...rest
  }: SidebarTriggerProps = $props();

  const ctx = getContext<SidebarContext | undefined>(SIDEBAR_CONTEXT);

  if (!ctx) {
    throw new Error('SidebarTrigger must be rendered inside a <SidebarProvider>.');
  }

  function handleClick(e: MouseEvent) {
    onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if ((e as Event).defaultPrevented) return;
    ctx?.toggle();
  }

  function handleKeydown(e: KeyboardEvent) {
    onkeydown?.(e as KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if ((e as Event).defaultPrevented) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      ctx?.toggle();
    }
  }

  const isOpen = $derived(ctx.isMobile ? ctx.openMobile : ctx.open);
  const computedLabel = $derived(ariaLabel ?? (isOpen ? 'Close sidebar' : 'Open sidebar'));
</script>

<button
  {...rest}
  type="button"
  data-jam-sidebar-trigger=""
  data-state={isOpen ? 'expanded' : 'collapsed'}
  aria-controls={ctx.panelId}
  aria-expanded={isOpen}
  aria-label={computedLabel}
  onclick={handleClick}
  onkeydown={handleKeydown}
  class={`jam-sidebar-trigger inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-none border border-jam-text/30 bg-transparent text-jam-text transition-colors duration-150 hover:border-jam-text hover:bg-jam-text hover:text-jam-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg disabled:cursor-not-allowed disabled:opacity-40 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {:else if ctx.side === 'right'}
    <PanelRight size={14} strokeWidth={2.5} />
  {:else}
    <PanelLeft size={14} strokeWidth={2.5} />
  {/if}
</button>
