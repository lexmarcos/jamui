<script lang="ts">
  import type { TableBodyProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableBodyProps = $props();
</script>

<tbody
  {...rest}
  class={`${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</tbody>
