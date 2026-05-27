<script lang="ts">
  import type { BreadcrumbLinkProps } from './breadcrumb';

  let {
    children,
    class: className = '',
    current = false,
    ...rest
  }: BreadcrumbLinkProps = $props();

  const baseClass = 'transition-colors duration-100';
  const linkClass = 'text-jam-muted hover:text-jam-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg';
  const currentClass = 'text-jam-text pointer-events-none';
</script>

{#if current}
  <span
    aria-current="page"
    class={`${baseClass} ${currentClass} ${className}`.trim()}
  >
    {#if children}
      {@render children()}
    {/if}
  </span>
{:else}
  <a
    {...rest}
    class={`${baseClass} ${linkClass} ${className}`.trim()}
  >
    {#if children}
      {@render children()}
    {/if}
  </a>
{/if}
