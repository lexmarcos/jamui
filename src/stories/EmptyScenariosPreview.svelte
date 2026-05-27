<script lang="ts">
  import Empty from '../lib/components/Empty.svelte';
  import Button from '../lib/components/Button.svelte';
  import type { EmptySize } from '../lib/components/empty';

  type PreviewProps = {
    description?: string;
    size?: EmptySize;
    title?: string;
    variant?: string;
  };

  let {
    description: _d,
    size: _s,
    title: _t,
    variant: _v,
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 28rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 2rem;"
>
  <Empty title="NO PROJECTS" description="Create your first project to begin tracking deployments." variant="no-data">
    <Button size="sm">NEW PROJECT</Button>
  </Empty>

  <Empty title="NO MATCHES" description='No results for "foobar". Try a different query.' variant="no-results">
    <Button size="sm" variant="secondary">CLEAR SEARCH</Button>
  </Empty>

  <Empty title="UNABLE TO LOAD" description="The API returned an error. Retry or contact support if the issue persists." variant="error">
    <Button size="sm" variant="secondary">RETRY</Button>
    <Button size="sm" variant="ghost">SUPPORT</Button>
  </Empty>
</div>
