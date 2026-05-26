<script lang="ts">
  import type { TableHeadProps } from './table';

  let {
    children,
    class: className = '',
    ...rest
  }: TableHeadProps = $props();
</script>

<thead
  {...rest}
  class={`border-b-2 border-jam-text/40 ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</thead>
