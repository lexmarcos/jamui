<script lang="ts">
  import { getContext } from 'svelte';
  import { DIALOG_CONTEXT, type DialogOverlayProps, type DialogContext } from './dialog-base';

  let {
    class: className = '',
    ...rest
  }: DialogOverlayProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);

  const baseClass = 'fixed inset-0 z-50 bg-jam-bg/80 transition-opacity duration-200 ease-out';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<div
  {...rest}
  class={mergedClass}
  aria-hidden="true"
></div>
