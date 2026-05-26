<script lang="ts">
  import { Badge } from '../lib';

  const variants = ['default', 'success', 'warning', 'danger', 'info'] as const;
  const styles = ['filled', 'outline', 'soft'] as const;
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1.5rem;"
>
  {#each styles as s}
    <div>
      <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">{s}</p>
      <div class="flex flex-wrap gap-2">
        {#each variants as v}
          <Badge variant={v} style={s}>{v}</Badge>
        {/each}
      </div>
    </div>
  {/each}

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Small</p>
    <div class="flex flex-wrap gap-2">
      {#each variants as v}
        <Badge variant={v} style="filled" size="sm">{v}</Badge>
      {/each}
    </div>
  </div>
</div>
