<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { DIALOG_CONTEXT, type DialogDescriptionProps, type DialogContext } from './dialog-base';

  let {
    children,
    class: className = '',
    ...rest
  }: DialogDescriptionProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);
  const descriptionId = `dialog-description-${Math.random().toString(36).slice(2, 9)}`;

  onMount(() => {
    ctx?.setDescriptionId(descriptionId);
    return () => {
      ctx?.setDescriptionId(undefined);
    };
  });

  const baseClass = 'text-xs font-medium leading-relaxed text-jam-bg/75';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<p {...rest} id={descriptionId} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</p>
