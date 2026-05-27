<script lang="ts">
  import { getContext } from 'svelte';
  import {
    CONTEXT_MENU_CONTENT,
    type ContextMenuContentContext,
    type ContextMenuItemProps,
  } from './context-menu';

  let {
    children,
    class: className = '',
    destructive = false,
    disabled = false,
    onclick,
    ...rest
  }: ContextMenuItemProps = $props();

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
    ctx?.close();
    onclick?.(e);
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
    'relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] outline-none transition-colors duration-100';

  const enabledNormalClass = 'text-jam-bg hover:bg-jam-bg hover:text-jam-text focus:bg-jam-bg focus:text-jam-text';
  const enabledDestructiveClass = 'text-jam-danger hover:bg-jam-danger hover:text-jam-text focus:bg-jam-danger focus:text-jam-text';
  const disabledClass = 'pointer-events-none cursor-not-allowed text-jam-bg/35';

  const variantClass = $derived(
    disabled ? disabledClass : destructive ? enabledDestructiveClass : enabledNormalClass
  );

  const mergedClass = $derived(`${baseClass} ${variantClass} ${className}`.trim());
</script>

<button
  bind:this={itemRef}
  {...rest}
  role="menuitem"
  type="button"
  class={mergedClass}
  {disabled}
  tabindex={-1}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
>
  {#if children}
    {@render children()}
  {/if}
</button>
