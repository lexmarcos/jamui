<script lang="ts">
  import { getContext } from 'svelte';
  import { DIALOG_CONTEXT, type DialogTriggerProps, type DialogContext } from './dialog-base';

  let {
    children,
    child,
    class: className = '',
    asChild = false,
    ...rest
  }: DialogTriggerProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);
  const childProps = $derived({
    ...rest,
    type: rest.type ?? 'button',
    class: className,
    onclick: handleClick
  });

  function handleClick(e: MouseEvent) {
    rest.onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (!e.defaultPrevented) {
      ctx?.setOpen(true);
    }
  }
</script>

{#if asChild && child}
  {@render child({ props: childProps })}
{:else}
  <button {...childProps}>
    {#if children}
      {@render children()}
    {/if}
  </button>
{/if}
