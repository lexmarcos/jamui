<script lang="ts">
  import ContextMenu from './ContextMenu.svelte';
  import ContextMenuTrigger from './ContextMenuTrigger.svelte';
  import ContextMenuContent from './ContextMenuContent.svelte';
  import ContextMenuItem from './ContextMenuItem.svelte';
  import ContextMenuPortal from './ContextMenuPortal.svelte';

  type Props = {
    onItemClick?: (item: string) => void;
  };

  let {
    onItemClick,
  }: Props = $props();
</script>

<ContextMenu>
  <ContextMenuTrigger data-testid="trigger">
    <div>Right-click area</div>
  </ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuContent>
      <ContextMenuItem onclick={() => onItemClick?.('edit')}>Edit</ContextMenuItem>
      <ContextMenuItem onclick={() => onItemClick?.('copy')}>Copy</ContextMenuItem>
      <ContextMenuItem disabled onclick={() => onItemClick?.('delete')}>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenuPortal>
</ContextMenu>
