<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { TABLE_CONTEXT, type TableProps } from './table';

  let {
    children,
    class: className = '',
    size = 'md',
    striped = false,
    ...rest
  }: TableProps = $props();

  setContext(TABLE_CONTEXT, {
    get size() { return size; },
    get striped() { return striped; }
  });
</script>

<div class="w-full overflow-x-auto">
  <table
    {...rest}
    class={`w-full border-collapse text-left font-jam-mono ${className}`.trim()}
  >
    {#if children}
      {@render children()}
    {/if}
  </table>
</div>
