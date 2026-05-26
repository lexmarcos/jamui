<script lang="ts">
  import type { CardBodyProps } from './card';

  let {
    children,
    class: className = '',
    ...rest
  }: CardBodyProps = $props();
</script>

<div
  {...rest}
  class={`px-4 py-4 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</div>
