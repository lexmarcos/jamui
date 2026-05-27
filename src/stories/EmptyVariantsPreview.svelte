<script lang="ts">
  import Empty from '../lib/components/Empty.svelte';
  import type { EmptySize, EmptyVariant } from '../lib/components/empty';

  type PreviewProps = {
    description?: string;
    size?: EmptySize;
    title?: string;
    variant?: EmptyVariant;
  };

  let {
    description: _description,
    size: _size,
    title: _title,
    variant: _variant,
  }: PreviewProps = $props();

  const variants: { variant: EmptyVariant; title: string; description: string }[] = [
    { variant: 'default', title: 'NOTHING HERE', description: 'This section is empty. Add items to get started.' },
    { variant: 'no-data', title: 'NO DATA', description: 'No records found in the database. Import or create new entries.' },
    { variant: 'no-results', title: 'NO RESULTS', description: 'Your search did not match any items. Try different keywords.' },
    { variant: 'error', title: 'LOAD FAILED', description: 'Could not load data. Check your connection and try again.' }
  ];
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1rem;"
>
  {#each variants as v}
    <Empty title={v.title} description={v.description} variant={v.variant} />
  {/each}
</div>
