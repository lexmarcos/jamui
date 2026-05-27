<script lang="ts">
  import ContextMenu from '../lib/components/ContextMenu.svelte';
  import ContextMenuTrigger from '../lib/components/ContextMenuTrigger.svelte';
  import ContextMenuContent from '../lib/components/ContextMenuContent.svelte';
  import ContextMenuCheckboxItem from '../lib/components/ContextMenuCheckboxItem.svelte';
  import ContextMenuSeparator from '../lib/components/ContextMenuSeparator.svelte';
  import ContextMenuPortal from '../lib/components/ContextMenuPortal.svelte';

  type PreviewProps = Record<string, never>;
  let _: PreviewProps = $props();

  let showBorders = $state(true);
  let showGrid = $state(false);
  let showRulers = $state(true);
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
        VIEW OPTIONS
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuCheckboxItem
          checked={showBorders}
          oncheckedchange={(v) => (showBorders = v)}
        >
          Show Borders
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showGrid}
          oncheckedchange={(v) => (showGrid = v)}
        >
          Show Grid
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showRulers}
          oncheckedchange={(v) => (showRulers = v)}
        >
          Show Rulers
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem disabled checked={true}>
          Snap to Grid
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenu>
</div>
