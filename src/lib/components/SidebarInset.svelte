<script lang="ts">
  import { getContext } from 'svelte';
  import {
    SIDEBAR_CONTEXT,
    type SidebarContext,
    type SidebarInsetProps
  } from './sidebar';

  let {
    children,
    class: className = '',
    ...rest
  }: SidebarInsetProps = $props();

  const ctx = getContext<SidebarContext | undefined>(SIDEBAR_CONTEXT);

  if (!ctx) {
    throw new Error('SidebarInset must be rendered inside a <SidebarProvider>.');
  }

  const variant = $derived(ctx.variant);
  const side = $derived(ctx.side);
</script>

<main
  {...rest}
  data-jam-sidebar-inset=""
  data-variant={variant}
  class={`relative flex min-h-svh flex-1 flex-col bg-jam-bg text-jam-text ${
    variant === 'inset'
      ? `${side === 'right' ? 'm-2 mr-0' : 'm-2 ml-0'} border border-jam-text/30 bg-jam-surface shadow-jam-hard-md`
      : ''
  } ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</main>
