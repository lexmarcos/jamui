<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import { DROPDOWN_CONTEXT, type DropdownContext, type DropdownItemProps } from './dropdown';

  let {
    children,
    class: className = '',
    disabled = false,
    onclick,
    ...rest
  }: DropdownItemProps = $props();

  const ctx = getContext<DropdownContext>(DROPDOWN_CONTEXT);
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
    'relative flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] text-jam-bg outline-none transition-colors duration-100';
  const enabledClass =
    'cursor-pointer hover:bg-jam-bg hover:text-jam-text focus:bg-jam-bg focus:text-jam-text';
  const disabledClass =
    'pointer-events-none cursor-not-allowed text-jam-bg/35';
  const itemClass = $derived(
    `${baseClass} ${disabled ? disabledClass : enabledClass} ${className}`.trim()
  );
</script>

<button
  bind:this={itemRef}
  {...rest}
  role="menuitem"
  type="button"
  class={itemClass}
  {disabled}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
  tabindex={-1}
>
  {#if children}
    {@render children()}
  {/if}
</button>
