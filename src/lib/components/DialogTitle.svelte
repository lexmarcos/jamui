<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { DIALOG_CONTEXT, type DialogTitleProps, type DialogContext } from './dialog-base';

  let {
    children,
    class: className = '',
    ...rest
  }: DialogTitleProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);
  const titleId = `dialog-title-${Math.random().toString(36).slice(2, 9)}`;

  onMount(() => {
    ctx?.setTitleId(titleId);
    return () => {
      ctx?.setTitleId(undefined);
    };
  });

  const baseClass = 'text-[11px] font-black uppercase tracking-[0.18em] text-jam-bg';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<h2 {...rest} id={titleId} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</h2>
