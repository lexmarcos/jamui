<script lang="ts">
  import type { SidebarMenuSubButtonProps, SidebarMenuSize } from './sidebar';

  const sizeClass: Record<SidebarMenuSize, string> = {
    sm: 'h-6 text-[10px] gap-1.5 px-2',
    md: 'h-7 text-[11px] gap-2 px-2',
    lg: 'h-8 text-xs gap-2 px-2'
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
    href,
    onclick,
    ...rest
  }: SidebarMenuSubButtonProps = $props();

  const baseClass =
    'group/jam-sidebar-menu-sub-button relative flex w-full min-w-0 cursor-pointer items-center overflow-hidden rounded-none border border-transparent text-left font-medium tracking-[0.04em] transition-colors duration-150 outline-none focus-visible:border-jam-text focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg';

  const stateClass = $derived(
    disabled
      ? 'cursor-not-allowed text-jam-text/25 hover:bg-transparent'
      : active
        ? 'bg-jam-text/10 text-jam-text shadow-[inset_2px_0_0_0_var(--color-jam-text)]'
        : 'text-jam-soft hover:bg-jam-text/[0.07] hover:text-jam-text active:bg-jam-text/15'
  );

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }

  const computedClass = $derived(`${baseClass} ${sizeClass[size]} ${stateClass} ${className}`.trim());
</script>

{#if href !== undefined}
  <a
    {...rest as Record<string, unknown>}
    href={disabled ? undefined : href}
    data-jam-sidebar-menu-sub-button=""
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
      <span class="flex size-3.5 shrink-0 items-center justify-center text-jam-soft/80 group-hover/jam-sidebar-menu-sub-button:text-jam-text group-data-[active=true]/jam-sidebar-menu-sub-button:text-jam-text">
        {@render icon()}
      </span>
    {/if}
    <span class="flex min-w-0 flex-1 items-center gap-2 truncate">
      {#if children}
        {@render children()}
      {/if}
    </span>
    {#if shortcut}
      <span class="ml-auto shrink-0 px-1 text-[9px] font-black uppercase tracking-[0.14em] text-jam-soft/60">
        {shortcut}
      </span>
    {/if}
    {#if badge}
      <span class="ml-auto inline-flex shrink-0 items-center">
        {@render badge()}
      </span>
    {/if}
  </a>
{:else}
  <button
    {...rest as Record<string, unknown>}
    type="button"
    data-jam-sidebar-menu-sub-button=""
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
      <span class="flex size-3.5 shrink-0 items-center justify-center text-jam-soft/80 group-hover/jam-sidebar-menu-sub-button:text-jam-text group-data-[active=true]/jam-sidebar-menu-sub-button:text-jam-text">
        {@render icon()}
      </span>
    {/if}
    <span class="flex min-w-0 flex-1 items-center gap-2 truncate">
      {#if children}
        {@render children()}
      {/if}
    </span>
    {#if shortcut}
      <span class="ml-auto shrink-0 px-1 text-[9px] font-black uppercase tracking-[0.14em] text-jam-soft/60">
        {shortcut}
      </span>
    {/if}
    {#if badge}
      <span class="ml-auto inline-flex shrink-0 items-center">
        {@render badge()}
      </span>
    {/if}
  </button>
{/if}
