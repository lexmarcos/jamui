<script lang="ts">
  import { getContext } from 'svelte';
  import { TAB_CONTEXT, type TabContext, type TabTriggerProps } from './tab';

  let {
    children,
    class: className = '',
    value,
    ...rest
  }: TabTriggerProps = $props();

  const ctx = getContext<TabContext>(TAB_CONTEXT);

  const isActive = $derived(ctx?.activeTab === value);
  const variant = $derived(ctx?.variant ?? 'default');
  const orientation = $derived(ctx?.orientation ?? 'horizontal');
  const size = $derived(ctx?.size ?? 'md');

  const sizeClass = $derived(
    size === 'sm'
      ? 'min-h-8 px-3 text-[10px] tracking-[0.16em]'
      : 'min-h-10 px-4 text-xs tracking-[0.18em]'
  );

  const baseClass = $derived(
    `relative flex cursor-pointer select-none items-center justify-center gap-1.5 font-black uppercase outline-none transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg ${sizeClass}`
  );

  const stateClass = $derived(
    variant === 'line'
      ? isActive
        ? orientation === 'vertical'
          ? 'border-r-2 border-jam-text bg-jam-text/5 text-jam-text'
          : 'border-b-2 border-jam-text bg-transparent text-jam-text'
        : orientation === 'vertical'
          ? 'border-r-2 border-transparent bg-transparent text-jam-muted hover:border-jam-text/30 hover:text-jam-text'
          : 'border-b-2 border-transparent bg-transparent text-jam-muted hover:border-jam-text/30 hover:text-jam-text'
      : isActive
        ? orientation === 'vertical'
          ? 'border-r-2 border-jam-text bg-jam-text text-jam-bg shadow-jam-hard-sm'
          : 'border-b-2 border-jam-text bg-jam-text text-jam-bg shadow-jam-hard-sm'
        : orientation === 'vertical'
          ? 'border-r-2 border-transparent bg-transparent text-jam-muted hover:border-jam-text/30 hover:bg-jam-text/5 hover:text-jam-text'
          : 'border-b-2 border-transparent bg-transparent text-jam-muted hover:border-jam-text/30 hover:bg-jam-text/5 hover:text-jam-text'
  );
</script>

<button
  {...rest}
  type="button"
  role="tab"
  aria-selected={isActive}
  tabindex={isActive ? 0 : -1}
  class={`${baseClass} ${stateClass} ${className}`.trim()}
  onclick={() => ctx?.setTab(value)}
>
  {#if children}
    {@render children()}
  {/if}
</button>
