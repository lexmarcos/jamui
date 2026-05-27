<script lang="ts">
  import { getContext } from 'svelte';
  import { DIALOG_CONTEXT, type DialogPortalProps, type DialogContext } from './dialog-base';

  let { children }: DialogPortalProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);
</script>

{#if ctx?.open}
  <div data-dialog-portal>
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
