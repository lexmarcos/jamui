<script lang="ts">
  import ContextMenu from './ContextMenu.svelte';
  import ContextMenuTrigger from './ContextMenuTrigger.svelte';
  import ContextMenuContent from './ContextMenuContent.svelte';
  import ContextMenuItem from './ContextMenuItem.svelte';
  import ContextMenuPortal from './ContextMenuPortal.svelte';
  import ContextMenuSub from './ContextMenuSub.svelte';
  import ContextMenuSubTrigger from './ContextMenuSubTrigger.svelte';
  import ContextMenuSubContent from './ContextMenuSubContent.svelte';

  let {
    onSubItemClick
  }: {
    onSubItemClick?: (item: string) => void;
  } = $props();
</script>

<ContextMenu>
  <ContextMenuTrigger data-testid="trigger">
    <div>Right click area</div>
  </ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuContent>
      <ContextMenuItem>Upload</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Open With</ContextMenuSubTrigger>
        <ContextMenuPortal>
          <ContextMenuSubContent data-testid="submenu">
            <ContextMenuItem onclick={() => onSubItemClick?.('default')}>Default App</ContextMenuItem>
            <ContextMenuItem onclick={() => onSubItemClick?.('browser')}>Browser</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuPortal>
      </ContextMenuSub>
      <ContextMenuItem>Share</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenuPortal>
</ContextMenu>
