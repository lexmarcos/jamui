<script lang="ts">
  import { Check } from '@lucide/svelte';
  import { getContext } from 'svelte';
  import {
    CONTEXT_MENU_CONTENT,
    type ContextMenuContentContext,
    type ContextMenuCheckboxItemProps,
  } from './context-menu';

  let {
    children,
    checked = false,
    class: className = '',
    disabled = false,
    oncheckedchange,
    ...rest
  }: ContextMenuCheckboxItemProps = $props();

  const ctx = getContext<ContextMenuContentContext>(CONTEXT_MENU_CONTENT);
  let itemRef = $state<HTMLButtonElement | null>(null);
  let index = $state(-1);

  $effect(() => {
    const node = itemRef;
    if (node && ctx) {
      index = ctx.registerItem(node, disabled);
      return () => {
        ctx.unregisterItem(node);
      };
    }
  });

  function handleClick(e: MouseEvent) {
    if (disabled) return;
    oncheckedchange?.(!checked);
    ctx?.close();
  }

  function handleMouseEnter() {
    if (!ctx) return;
    if (disabled) {
      ctx.setActiveIndex(-1);
    } else {
      ctx.setActiveIndex(index);
    }
  }

  const baseClass =
    'relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none transition-colors duration-100 hover:bg-jam-bg hover:text-jam-text focus:bg-jam-bg focus:text-jam-text';

  const disabledClass = 'pointer-events-none cursor-not-allowed text-jam-bg/35';

  const mergedClass = $derived(
    `${baseClass} ${disabled ? disabledClass : ''} ${className}`.trim()
  );
</script>

<button
  bind:this={itemRef}
  {...rest}
  role="menuitemcheckbox"
  type="button"
  aria-checked={checked}
  class={mergedClass}
  {disabled}
  tabindex={-1}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
>
  <span class="flex h-4 w-4 shrink-0 items-center justify-center">
    {#if checked}
      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
    {/if}
  </span>
  <span class="flex min-w-0 flex-1 items-center gap-2 truncate text-left [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
    {#if children}
      {@render children()}
    {/if}
  </span>
</button>
