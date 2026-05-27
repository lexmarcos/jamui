<script lang="ts">
  import { getContext, tick } from 'svelte';
  import {
    SIDEBAR_CONTEXT,
    type SidebarContext,
    type SidebarProps
  } from './sidebar';

  let {
    children,
    class: className = '',
    side = 'left',
    variant = 'sidebar',
    collapsible = 'offcanvas',
    'aria-label': ariaLabel = 'Sidebar',
    ...rest
  }: SidebarProps = $props();

  const ctx = getContext<SidebarContext | undefined>(SIDEBAR_CONTEXT);

  if (!ctx) {
    throw new Error('Sidebar must be rendered inside a <SidebarProvider>.');
  }

  // Register layout config back into the provider so trigger/rail/inset
  // can read side/variant/collapsible from a single source of truth.
  $effect(() => {
    ctx.registerSidebar({ side, variant, collapsible });
  });

  let panelRef = $state<HTMLElement | null>(null);
  let mobileOverlayRef = $state<HTMLDivElement | null>(null);

  const isMobile = $derived(ctx.isMobile);
  const open = $derived(ctx.open);
  const openMobile = $derived(ctx.openMobile);

  // Visibility for animation: keep panel mounted during exit animation
  // when on mobile, so the slide-out is observable.
  let mobileVisible = $state(false);
  let mobileEntered = $state(false);

  $effect(() => {
    if (openMobile) {
      mobileVisible = true;
      tick().then(() => { mobileEntered = true; });
      return;
    }
    mobileEntered = false;
    const t = setTimeout(() => { mobileVisible = false; }, 250);
    return () => clearTimeout(t);
  });

  function handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) ctx?.setOpenMobile(false);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && openMobile) {
      e.preventDefault();
      e.stopPropagation();
      ctx?.setOpenMobile(false);
    }
  }

  // ─── Desktop classes ────────────────────────────────────────────────────
  // Two layers: the "gap" element keeps space in the document flow (width
  // animates between expanded/icon/0) and the fixed panel slides in/out.
  // For variant=inset we omit the fixed positioning and use a normal flex item.

  const isInset = $derived(variant === 'inset');
  const isFloating = $derived(variant === 'floating');

  const desktopGapWidthClass = $derived(
    collapsible === 'none' || open
      ? 'w-[var(--jam-sidebar-width)]'
      : collapsible === 'icon'
        ? isInset
          ? 'w-[calc(var(--jam-sidebar-width-icon)+1rem)]'
          : 'w-[var(--jam-sidebar-width-icon)]'
        : 'w-0'
  );

  const panelSurface = $derived(
    isFloating
      ? 'border border-jam-text/30 bg-jam-surface shadow-jam-hard-md'
      : 'border-jam-text/15 bg-jam-surface'
  );
  const panelBorder = $derived(
    isFloating || isInset
      ? ''
      : side === 'left'
        ? 'border-r border-jam-text/20'
        : 'border-l border-jam-text/20'
  );

  // Icon-only mode is active only when BOTH conditions hold; expanded state
  // must always show labels even if collapsible='icon'.
  const iconOnly = $derived(ctx.state === 'collapsed' && collapsible === 'icon');
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isMobile}
  <!-- Mobile drawer: portal-less; relies on z-index/fixed. -->
  {#if mobileVisible}
    <div
      bind:this={mobileOverlayRef}
      data-jam-sidebar-overlay=""
      class={`fixed inset-0 z-40 bg-jam-bg/70 backdrop-blur-[1px] transition-opacity duration-200 ease-out ${
        mobileEntered ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden="true"
      onclick={handleOverlayClick}
    ></div>

    <aside
      bind:this={panelRef}
      {...rest}
      id={ctx.panelId}
      data-jam-sidebar=""
      data-mobile="true"
      data-state={openMobile ? 'expanded' : 'collapsed'}
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-icon-only="false"
      aria-label={ariaLabel}
      aria-hidden={openMobile ? undefined : 'true'}
      class={`group/jam-sidebar fixed inset-y-0 z-50 flex w-[var(--jam-sidebar-width-mobile)] flex-col bg-jam-surface text-jam-text shadow-jam-hard-md transition-transform duration-200 ease-out ${
        side === 'left' ? 'left-0' : 'right-0'
      } ${
        mobileEntered ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
      } ${className}`.trim()}
    >
      {#if children}
        {@render children()}
      {/if}
    </aside>
  {/if}
{:else}
  <!-- Desktop layout: a flex item. The "gap" reserves space; the inner
       wrapper positions the visible panel. -->
  <div
    data-jam-sidebar-gap=""
    data-state={ctx.state}
    data-side={side}
    data-variant={variant}
    data-collapsible={collapsible}
    data-icon-only={iconOnly ? 'true' : 'false'}
    aria-hidden="true"
    class={`relative h-svh shrink-0 bg-transparent transition-[width] duration-200 ease-out ${desktopGapWidthClass} ${
      side === 'right' ? 'order-2' : 'order-0'
    } ${
      isInset ? 'p-2' : ''
    }`}
  ></div>

  <aside
    bind:this={panelRef}
    {...rest}
    id={ctx.panelId}
    data-jam-sidebar=""
    data-state={ctx.state}
    data-side={side}
    data-variant={variant}
    data-collapsible={collapsible}
    data-icon-only={iconOnly ? 'true' : 'false'}
    aria-label={ariaLabel}
    aria-hidden={ctx.state === 'collapsed' && collapsible === 'offcanvas' ? 'true' : undefined}
    class={`group/jam-sidebar fixed inset-y-0 z-30 hidden h-svh flex-col text-jam-text transition-[left,right,width,padding] duration-200 ease-out md:flex ${
      side === 'left' ? 'left-0' : 'right-0'
    } ${panelBorder} ${panelSurface} ${
      isInset ? 'p-2' : ''
    } ${
      // Width based on state
      collapsible === 'none' || open
        ? 'w-[var(--jam-sidebar-width)]'
        : collapsible === 'icon'
          ? isInset
            ? 'w-[calc(var(--jam-sidebar-width-icon)+1rem)]'
            : 'w-[var(--jam-sidebar-width-icon)]'
          : 'w-[var(--jam-sidebar-width)]'
    } ${
      // For offcanvas collapsed, translate off-screen.
      ctx.state === 'collapsed' && collapsible === 'offcanvas'
        ? side === 'left'
          ? '-translate-x-full'
          : 'translate-x-full'
        : 'translate-x-0'
    } ${className}`.trim()}
  >
    <div
      data-jam-sidebar-inner=""
      class={`flex h-full w-full flex-col overflow-hidden ${
        isInset ? 'border border-jam-text/30 bg-jam-surface' : ''
      }`}
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  </aside>
{/if}
