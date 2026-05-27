<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  let {
    children,
  }: Props = $props();

  let portalRoot = $state<HTMLDivElement | null>(null);

  function portalAction(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    };
  }
</script>

{#if children}
  <div bind:this={portalRoot} use:portalAction style="position: static;">
    {@render children()}
  </div>
{/if}
