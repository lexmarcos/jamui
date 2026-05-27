<script lang="ts">
  import { Circle } from '@lucide/svelte';
  import { getContext } from 'svelte';
  import {
    CONTEXT_MENU_CONTENT,
    CONTEXT_MENU_RADIO_GROUP,
    type ContextMenuContentContext,
    type ContextMenuRadioGroupContext,
    type ContextMenuRadioItemProps,
  } from './context-menu';

  let {
    children,
    class: className = '',
    disabled = false,
    value,
    ...rest
  }: ContextMenuRadioItemProps = $props();

  const ctx = getContext<ContextMenuContentContext>(CONTEXT_MENU_CONTENT);
  const radioCtx = getContext<ContextMenuRadioGroupContext>(CONTEXT_MENU_RADIO_GROUP);
  let itemRef = $state<HTMLButtonElement | null>(null);
  let index = $state(-1);

  const checked = $derived(radioCtx?.value === value);

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
    radioCtx?.onValueChange(value);
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
  role="menuitemradio"
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
      <Circle size={10} fill="currentColor" strokeWidth={0} aria-hidden="true" />
    {/if}
  </span>
  <span class="flex-1 truncate text-left">
    {#if children}
      {@render children()}
    {/if}
  </span>
</button>
