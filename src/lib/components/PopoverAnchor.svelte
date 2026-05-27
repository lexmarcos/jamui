<script lang="ts">
  import { getContext } from 'svelte';
  import { POPOVER_ANCHOR_CONTEXT, type PopoverAnchorContext, type PopoverAnchorProps } from './popover';

  let {
    children,
    class: className = '',
    ...rest
  }: PopoverAnchorProps = $props();

  const ctx = getContext<PopoverAnchorContext>(POPOVER_ANCHOR_CONTEXT);
  let anchorRef = $state<HTMLDivElement | null>(null);

  $effect(() => {
    ctx?.registerAnchor(anchorRef);
    return () => {
      ctx?.registerAnchor(null);
    };
  });
</script>

<div
  bind:this={anchorRef}
  {...rest}
  class={`inline-block ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
