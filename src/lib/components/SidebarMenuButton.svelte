<script lang="ts">
  import type { SidebarMenuButtonProps, SidebarMenuSize } from './sidebar';
  import { ChevronRight } from '@lucide/svelte';

  const sizeClass: Record<SidebarMenuSize, string> = {
    sm: 'h-7 px-2 text-[11px] gap-1.5',
    md: 'h-9 px-2.5 text-xs gap-2',
    lg: 'h-11 px-3 text-sm gap-2.5'
  };

  let {
    children,
    class: className = '',
    active = false,
    disabled = false,
    icon,
    badge,
    shortcut,
    size = 'md',
    hasSub = false,
    href,
    onclick,
    ...rest
  }: SidebarMenuButtonProps = $props();

  // Combine base + variant classes. The shared classes intentionally don't
  // set color states differently per element type — both <a> and <button>
  // pick up the same look.
  const baseClass =
    'group/jam-sidebar-menu-button relative flex w-full min-w-0 cursor-pointer items-center overflow-hidden rounded-none border border-transparent text-left font-bold tracking-[0.04em] transition-colors duration-150 outline-none focus-visible:border-jam-text focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg';

  const stateClass = $derived(
    disabled
      ? 'cursor-not-allowed text-jam-text/30 hover:bg-transparent'
      : active
        ? 'bg-jam-text text-jam-bg shadow-[inset_3px_0_0_0_var(--color-jam-text)]'
        : 'text-jam-text hover:bg-jam-text/10 hover:text-jam-text active:bg-jam-text/15'
  );

  const iconOnlyClass =
    'group-data-[icon-only=true]/jam-sidebar:size-9 group-data-[icon-only=true]/jam-sidebar:!p-0 group-data-[icon-only=true]/jam-sidebar:justify-center';

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }

  const computedClass = $derived(
    `${baseClass} ${sizeClass[size]} ${stateClass} ${iconOnlyClass} ${className}`.trim()
  );
</script>

{#if href !== undefined}
  <a
    {...rest as Record<string, unknown>}
    href={disabled ? undefined : href}
    data-jam-sidebar-menu-button=""
    data-active={active ? 'true' : undefined}
    data-disabled={disabled ? 'true' : undefined}
    data-size={size}
    aria-current={active ? 'page' : undefined}
    aria-disabled={disabled ? 'true' : undefined}
    tabindex={disabled ? -1 : 0}
    onclick={handleClick}
    class={computedClass}
  >
    {#if icon}
      <span class="flex size-4 shrink-0 items-center justify-center text-jam-soft group-hover/jam-sidebar-menu-button:text-jam-text group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg">
        {@render icon()}
      </span>
    {/if}
    <span class="flex min-w-0 flex-1 items-center gap-2 truncate group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg group-data-[icon-only=true]/jam-sidebar:hidden">
      {#if children}
        {@render children()}
      {/if}
    </span>
    {#if shortcut}
      <span
        class="ml-auto shrink-0 border border-jam-text/30 px-1.5 py-[2px] text-[9px] font-black uppercase tracking-[0.16em] text-jam-soft/80 group-data-[active=true]/jam-sidebar-menu-button:border-jam-bg/30 group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg/70 group-data-[icon-only=true]/jam-sidebar:hidden"
      >
        {shortcut}
      </span>
    {/if}
    {#if badge}
      <span class="ml-auto inline-flex shrink-0 items-center group-data-[icon-only=true]/jam-sidebar:hidden">
        {@render badge()}
      </span>
    {/if}
    {#if hasSub}
      <ChevronRight
        size={12}
        strokeWidth={2.5}
        class="ml-1 shrink-0 transition-transform duration-150 group-aria-expanded/jam-sidebar-menu-button:rotate-90 group-data-[icon-only=true]/jam-sidebar:hidden"
      />
    {/if}
  </a>
{:else}
  <button
    {...rest as Record<string, unknown>}
    type="button"
    data-jam-sidebar-menu-button=""
    data-active={active ? 'true' : undefined}
    data-disabled={disabled ? 'true' : undefined}
    data-size={size}
    aria-current={active ? 'page' : undefined}
    aria-disabled={disabled ? 'true' : undefined}
    disabled={disabled}
    onclick={handleClick}
    class={computedClass}
  >
    {#if icon}
      <span class="flex size-4 shrink-0 items-center justify-center text-jam-soft group-hover/jam-sidebar-menu-button:text-jam-text group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg">
        {@render icon()}
      </span>
    {/if}
    <span class="flex min-w-0 flex-1 items-center gap-2 truncate group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg group-data-[icon-only=true]/jam-sidebar:hidden">
      {#if children}
        {@render children()}
      {/if}
    </span>
    {#if shortcut}
      <span
        class="ml-auto shrink-0 border border-jam-text/30 px-1.5 py-[2px] text-[9px] font-black uppercase tracking-[0.16em] text-jam-soft/80 group-data-[active=true]/jam-sidebar-menu-button:border-jam-bg/30 group-data-[active=true]/jam-sidebar-menu-button:text-jam-bg/70 group-data-[icon-only=true]/jam-sidebar:hidden"
      >
        {shortcut}
      </span>
    {/if}
    {#if badge}
      <span class="ml-auto inline-flex shrink-0 items-center group-data-[icon-only=true]/jam-sidebar:hidden">
        {@render badge()}
      </span>
    {/if}
    {#if hasSub}
      <ChevronRight
        size={12}
        strokeWidth={2.5}
        class="ml-1 shrink-0 transition-transform duration-150 group-aria-expanded/jam-sidebar-menu-button:rotate-90 group-data-[icon-only=true]/jam-sidebar:hidden"
      />
    {/if}
  </button>
{/if}
