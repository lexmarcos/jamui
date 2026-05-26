<script lang="ts">
  import { getContext } from 'svelte';
  import { SELECT_CONTEXT, type SelectContext, type SelectOptionProps } from './select';

  let {
    children,
    class: className = '',
    disabled = false,
    label,
    value,
    ...rest
  }: SelectOptionProps = $props();

  const ctx = getContext<SelectContext>(SELECT_CONTEXT);
  let optionRef = $state<HTMLDivElement | null>(null);
  let index = $state(-1);

  $effect(() => {
    const node = optionRef;

    if (node && ctx) {
      index = ctx.registerOption(node, value, disabled, label);
      return () => {
        ctx.unregisterOption(node);
      };
    }
  });

  const isSelected = $derived(ctx?.value === value);
  const isActive = $derived(ctx?.activeIndex === index);

  const baseClass =
    'relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-bold font-jam-mono tracking-[0.06em] outline-none transition-colors duration-100';

  const stateClass = $derived(
    disabled
      ? 'cursor-not-allowed text-jam-bg/30'
      : isSelected
        ? 'bg-jam-bg text-jam-text'
        : isActive
          ? 'bg-jam-bg text-jam-text'
          : 'text-jam-bg hover:bg-jam-bg/10'
  );

  function handleClick() {
    if (disabled) return;
    ctx?.setValue(value);
  }

  function handleMouseEnter() {
    if (!disabled && ctx) {
      ctx.setActiveIndex(index);
    }
  }
</script>

<div
  bind:this={optionRef}
  {...rest}
  role="option"
  aria-selected={isSelected}
  class={`${baseClass} ${stateClass} ${className}`.trim()}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
  tabindex={-1}
>
  {#if children}
    {@render children()}
  {:else}
    {label}
  {/if}
</div>
