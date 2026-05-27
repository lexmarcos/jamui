<script lang="ts">
  import { getContext } from 'svelte';
  import {
    SIDEBAR_CONTEXT,
    type SidebarContext,
    type SidebarRailProps
  } from './sidebar';

  let {
    class: className = '',
    'aria-label': ariaLabel = 'Toggle sidebar',
    ...rest
  }: SidebarRailProps = $props();

  const ctx = getContext<SidebarContext | undefined>(SIDEBAR_CONTEXT);
  if (!ctx) {
    throw new Error('SidebarRail must be rendered inside a <SidebarProvider>.');
  }

  function handleClick() {
    ctx?.toggle();
  }
</script>

<button
  {...rest}
  type="button"
  data-jam-sidebar-rail=""
  data-side={ctx.side}
  aria-label={ariaLabel}
  aria-controls={ctx.panelId}
  tabindex={-1}
  onclick={handleClick}
  class={`absolute inset-y-0 z-10 hidden w-3 cursor-col-resize bg-transparent transition-colors duration-150 hover:bg-jam-text/10 focus-visible:outline-none md:block ${
    ctx.side === 'left' ? 'right-[-6px]' : 'left-[-6px]'
  } ${className}`.trim()}
>
  <span
    aria-hidden="true"
    class={`absolute inset-y-2 block w-px ${ctx.side === 'left' ? 'right-1' : 'left-1'} bg-jam-text/20 transition-colors group-hover/jam-sidebar:bg-jam-text/40`}
  ></span>
</button>
