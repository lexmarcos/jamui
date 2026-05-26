<script lang="ts">
  import { getContext } from 'svelte';
  import { ALERT_DIALOG_CONTEXT, type AlertDialogActionProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogActionProps = $props();

  const ctx = getContext<{ close: () => void }>(ALERT_DIALOG_CONTEXT);

  const baseClass =
    'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-none border border-jam-bg bg-jam-bg px-4 font-black uppercase tracking-[0.2em] text-jam-text text-xs transition-all duration-150 ease-out hover:shadow-jam-hard-blue-md active:shadow-none active:bg-jam-surface-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text';
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
