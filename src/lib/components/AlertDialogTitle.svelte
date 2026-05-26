<script lang="ts">
  import type { AlertDialogTitleProps } from './dialog';

  let {
    children,
    class: className = '',
    ...rest
  }: AlertDialogTitleProps = $props();

  const baseClass = 'text-[11px] font-black uppercase tracking-[0.18em] text-jam-bg';
  const mergedClass = $derived(`${baseClass} ${className}`.trim());
</script>

<h2 {...rest} class={mergedClass}>
  {#if children}
    {@render children()}
  {/if}
</h2>
