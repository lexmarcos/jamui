<script lang="ts">
  import { Eye, Download, Share2, Trash2, FileEdit } from '@lucide/svelte';
  import ContextMenu from '../lib/components/ContextMenu.svelte';
  import ContextMenuTrigger from '../lib/components/ContextMenuTrigger.svelte';
  import ContextMenuContent from '../lib/components/ContextMenuContent.svelte';
  import ContextMenuItem from '../lib/components/ContextMenuItem.svelte';
  import ContextMenuSeparator from '../lib/components/ContextMenuSeparator.svelte';
  import ContextMenuShortcut from '../lib/components/ContextMenuShortcut.svelte';
  import ContextMenuPortal from '../lib/components/ContextMenuPortal.svelte';
  import ContextMenuLabel from '../lib/components/ContextMenuLabel.svelte';
  import ContextMenuGroup from '../lib/components/ContextMenuGroup.svelte';

  type PreviewProps = Record<string, never>;
  let _: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; min-height: 18rem; background: var(--color-jam-bg); padding: 2rem; display: flex; justify-content: center; align-items: center;"
>
  <ContextMenu>
    <ContextMenuTrigger>
      <table class="w-64 cursor-context-menu border border-jam-text/15 bg-jam-surface text-xs font-jam-mono text-jam-text">
        <tbody>
          <tr class="border-b border-jam-text/10">
            <td class="p-2 text-jam-muted">report.pdf</td>
            <td class="p-2 text-right text-[10px] text-jam-soft">2.4 MB</td>
          </tr>
          <tr class="border-b border-jam-text/10">
            <td class="p-2 text-jam-muted">notes.txt</td>
            <td class="p-2 text-right text-[10px] text-jam-soft">12 KB</td>
          </tr>
          <tr>
            <td class="p-2 text-jam-muted">image.png</td>
            <td class="p-2 text-right text-[10px] text-jam-soft">1.1 MB</td>
          </tr>
        </tbody>
      </table>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>ACTIONS</ContextMenuLabel>
          <ContextMenuItem>
            <Eye size={14} strokeWidth={2.5} class="opacity-70" />
            Preview
            <ContextMenuShortcut>Space</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Download size={14} strokeWidth={2.5} class="opacity-70" />
            Download
            <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Share2 size={14} strokeWidth={2.5} class="opacity-70" />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <FileEdit size={14} strokeWidth={2.5} class="opacity-70" />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Move to folder
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive>
          <Trash2 size={14} strokeWidth={2.5} class="opacity-70" />
          Delete
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenu>
</div>
