<script lang="ts">
  import type { AvatarProps, AvatarSize } from './avatar';

  const baseClass =
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-none border border-jam-text/15 font-jam-mono font-black uppercase';

  const sizeClass: Record<AvatarSize, string> = {
    sm: 'h-8 w-8 text-[10px] tracking-[0.12em]',
    md: 'h-10 w-10 text-[11px] tracking-[0.14em]',
    lg: 'h-12 w-12 text-xs tracking-[0.16em]',
    xl: 'h-16 w-16 text-sm tracking-[0.18em]'
  };

  const fallbackBgClass = 'bg-jam-surface text-jam-muted';

  let {
    class: className = '',
    src,
    alt = '',
    fallback,
    size = 'md',
    ...rest
  }: AvatarProps = $props();

  let errored = $state(false);

  const mergedClass = $derived(
    `${baseClass} ${sizeClass[size]} ${!src || errored ? fallbackBgClass : ''} ${className}`.trim()
  );

  function handleError() {
    errored = true;
  }
</script>

<div {...rest} class={mergedClass}>
  {#if src && !errored}
    <img
      {src}
      {alt}
      class="absolute inset-0 h-full w-full object-cover"
      onerror={handleError}
    />
  {:else if fallback}
    {@render fallback()}
  {/if}
</div>
