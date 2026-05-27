<script lang="ts">
  import ContextMenu from '../lib/components/ContextMenu.svelte';
  import ContextMenuTrigger from '../lib/components/ContextMenuTrigger.svelte';
  import ContextMenuContent from '../lib/components/ContextMenuContent.svelte';
  import ContextMenuRadioGroup from '../lib/components/ContextMenuRadioGroup.svelte';
  import ContextMenuRadioItem from '../lib/components/ContextMenuRadioItem.svelte';
  import ContextMenuSeparator from '../lib/components/ContextMenuSeparator.svelte';
  import ContextMenuLabel from '../lib/components/ContextMenuLabel.svelte';
  import ContextMenuGroup from '../lib/components/ContextMenuGroup.svelte';
  import ContextMenuPortal from '../lib/components/ContextMenuPortal.svelte';

  type PreviewProps = Record<string, never>;
  let _: PreviewProps = $props();

  let sortBy = $state('name');
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 18rem; background: var(--color-jam-bg); padding: 2rem; display: flex; justify-content: center; align-items: center;"
>
  <ContextMenu>
    <ContextMenuTrigger>
      <div
        class="flex min-h-[8rem] w-64 cursor-context-menu items-center justify-center border-2 border-dashed border-jam-text/20 p-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-jam-muted"
      >
        SORT OPTIONS
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>SORT BY</ContextMenuLabel>
          <ContextMenuRadioGroup value={sortBy} onvaluechange={(v) => (sortBy = v)}>
            <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
            <ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
            <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
            <ContextMenuRadioItem value="type">Type</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>ORDER</ContextMenuLabel>
          <ContextMenuRadioItem value="asc" disabled>Ascending</ContextMenuRadioItem>
          <ContextMenuRadioItem value="desc">Descending</ContextMenuRadioItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenu>
</div>
