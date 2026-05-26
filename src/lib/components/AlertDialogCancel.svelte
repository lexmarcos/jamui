<script lang="ts">
  import { getContext } from 'svelte';
  import { ALERT_DIALOG_CONTEXT, type AlertDialogCancelProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogCancelProps = $props();

  const ctx = getContext<{ close: () => void }>(ALERT_DIALOG_CONTEXT);

  const baseClass =
    'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-none border border-jam-bg/25 bg-transparent px-4 font-black uppercase tracking-[0.2em] text-jam-bg text-xs transition-all duration-150 ease-out hover:border-jam-bg hover:bg-jam-bg/10 hover:shadow-jam-hard-blue-sm active:shadow-none active:bg-jam-bg/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());

  function handleClick(e: MouseEvent) {
    rest.onclick?.(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
    if (!e.defaultPrevented) {
      ctx?.close();
    }
  }
</script>

<button {...rest} type="button" class={mergedClass} onclick={handleClick}>
  {#if children}
    {@render children()}
  {/if}
</button>
