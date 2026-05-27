<script lang="ts">
  import { setContext } from 'svelte';
  import { BREADCRUMB_CONTEXT, type BreadcrumbProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    separator,
    ...rest
  }: BreadcrumbProps = $props();

  setContext(BREADCRUMB_CONTEXT, {
    get separator() { return separator; }
  });
</script>

<nav
  {...rest}
  aria-label="Breadcrumb"
  class={`font-jam-mono ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</nav>
