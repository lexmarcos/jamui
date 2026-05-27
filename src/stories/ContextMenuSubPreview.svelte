<script lang="ts">
  import { Share2, Download, FileText, Image, FileCode, FolderOpen, Upload } from '@lucide/svelte';
  import ContextMenu from '../lib/components/ContextMenu.svelte';
  import ContextMenuTrigger from '../lib/components/ContextMenuTrigger.svelte';
  import ContextMenuContent from '../lib/components/ContextMenuContent.svelte';
  import ContextMenuItem from '../lib/components/ContextMenuItem.svelte';
  import ContextMenuSeparator from '../lib/components/ContextMenuSeparator.svelte';
  import ContextMenuShortcut from '../lib/components/ContextMenuShortcut.svelte';
  import ContextMenuPortal from '../lib/components/ContextMenuPortal.svelte';
  import ContextMenuSub from '../lib/components/ContextMenuSub.svelte';
  import ContextMenuSubTrigger from '../lib/components/ContextMenuSubTrigger.svelte';
  import ContextMenuSubContent from '../lib/components/ContextMenuSubContent.svelte';

  type PreviewProps = Record<string, never>;
  let _: PreviewProps = $props();
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
        RIGHT-CLICK
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuItem>
          <Upload size={14} strokeWidth={2.5} class="opacity-70" />
          Upload
          <ContextMenuShortcut>Ctrl+U</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Download size={14} strokeWidth={2.5} class="opacity-70" />
            Export As
          </ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem>
                <FileText size={14} strokeWidth={2.5} class="opacity-70" />
                PDF
              </ContextMenuItem>
              <ContextMenuItem>
                <Image size={14} strokeWidth={2.5} class="opacity-70" />
                PNG
              </ContextMenuItem>
              <ContextMenuItem>
                <FileCode size={14} strokeWidth={2.5} class="opacity-70" />
                SVG
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderOpen size={14} strokeWidth={2.5} class="opacity-70" />
            Open With
          </ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem>Default App</ContextMenuItem>
              <ContextMenuItem>Browser</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <FileCode size={14} strokeWidth={2.5} class="opacity-70" />
                Code Editor
                <ContextMenuShortcut>Ctrl+O</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Share2 size={14} strokeWidth={2.5} class="opacity-70" />
          Share
          <ContextMenuShortcut>Ctrl+S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenu>
</div>
