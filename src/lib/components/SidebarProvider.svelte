<script lang="ts">
  import { setContext, untrack } from 'svelte';
  import {
    SIDEBAR_CONTEXT,
    SIDEBAR_KEYBOARD_SHORTCUT,
    SIDEBAR_MOBILE_BREAKPOINT,
    SIDEBAR_WIDTH_EXPANDED,
    SIDEBAR_WIDTH_ICON,
    SIDEBAR_WIDTH_MOBILE,
    type SidebarCollapsible,
    type SidebarContext,
    type SidebarProviderProps,
    type SidebarSide,
    type SidebarVariant
  } from './sidebar';

  let {
    children,
    class: className = '',
    open,
    defaultOpen = true,
    onOpenChange,
    openMobile,
    defaultOpenMobile = false,
    onOpenMobileChange,
    persistKey,
    disableKeyboardShortcut = false,
    widthExpanded = SIDEBAR_WIDTH_EXPANDED,
    widthCollapsed = SIDEBAR_WIDTH_ICON,
    widthMobile = SIDEBAR_WIDTH_MOBILE,
    mobileBreakpoint = SIDEBAR_MOBILE_BREAKPOINT,
    ...rest
  }: SidebarProviderProps = $props();

  function readPersisted(key: string | undefined, fallback: boolean): boolean {
    if (!key || typeof window === 'undefined') return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return raw === 'true';
    } catch {
      return fallback;
    }
  }

  function writePersisted(key: string | undefined, value: boolean) {
    if (!key || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, String(value));
    } catch {
      // ignore quota/security errors
    }
  }

  const isControlled = $derived(open !== undefined);
  const isMobileControlled = $derived(openMobile !== undefined);

  let internalOpen: boolean = $state(
    untrack(() => readPersisted(persistKey, defaultOpen))
  );
  let internalOpenMobile: boolean = $state(untrack(() => defaultOpenMobile));
  let isMobile: boolean = $state(false);

  // Stable id for aria-controls wiring.
  const panelId = `jam-sidebar-${Math.random().toString(36).slice(2, 9)}`;

  let registeredSide: SidebarSide = $state('left');
  let registeredVariant: SidebarVariant = $state('sidebar');
  let registeredCollapsible: SidebarCollapsible = $state('offcanvas');

  const currentOpen: boolean = $derived(isControlled ? !!open : internalOpen);
  const currentOpenMobile: boolean = $derived(isMobileControlled ? !!openMobile : internalOpenMobile);
  const sidebarState: SidebarContext['state'] = $derived(currentOpen ? 'expanded' : 'collapsed');

  function setOpen(value: boolean) {
    if (isControlled) {
      onOpenChange?.(value);
      return;
    }
    internalOpen = value;
    writePersisted(persistKey, value);
    onOpenChange?.(value);
  }

  function setOpenMobile(value: boolean) {
    if (isMobileControlled) {
      onOpenMobileChange?.(value);
      return;
    }
    internalOpenMobile = value;
    onOpenMobileChange?.(value);
  }

  function toggle() {
    if (isMobile) setOpenMobile(!currentOpenMobile);
    else setOpen(!currentOpen);
  }

  function registerSidebar(config: {
    side: SidebarSide;
    variant: SidebarVariant;
    collapsible: SidebarCollapsible;
  }) {
    registeredSide = config.side;
    registeredVariant = config.variant;
    registeredCollapsible = config.collapsible;
  }

  // Track viewport breakpoint
  $effect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => { isMobile = e.matches; };
    isMobile = mql.matches;
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    // Legacy fallback
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  });

  // Keyboard shortcut: Ctrl/Cmd + B
  $effect(() => {
    if (disableKeyboardShortcut || typeof window === 'undefined') return;
    function onKey(e: KeyboardEvent) {
      if (
        e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (e.metaKey || e.ctrlKey) &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // When switching between desktop/mobile, close the mobile sheet so it
  // doesn't linger off-screen.
  $effect(() => {
    if (!isMobile && currentOpenMobile) setOpenMobile(false);
  });

  setContext<SidebarContext>(SIDEBAR_CONTEXT, {
    get state() { return sidebarState; },
    get open() { return currentOpen; },
    setOpen,
    get openMobile() { return currentOpenMobile; },
    setOpenMobile,
    get isMobile() { return isMobile; },
    toggle,
    get side() { return registeredSide; },
    get variant() { return registeredVariant; },
    get collapsible() { return registeredCollapsible; },
    panelId,
    registerSidebar
  });

  const styleVar = $derived(
    `--jam-sidebar-width:${widthExpanded};--jam-sidebar-width-icon:${widthCollapsed};--jam-sidebar-width-mobile:${widthMobile};`
  );
</script>

<div
  {...rest}
  data-jam-sidebar-provider=""
  data-state={sidebarState}
  data-mobile={isMobile ? 'true' : 'false'}
  style={styleVar}
  class={`jam-sidebar-provider relative flex min-h-svh w-full font-jam-mono text-jam-text ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
