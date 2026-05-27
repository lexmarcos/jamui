<script lang="ts">
  import { Pencil, Trash2, Copy, Scissors, Clipboard } from '@lucide/svelte';
  import ContextMenu from '../lib/components/ContextMenu.svelte';
  import ContextMenuTrigger from '../lib/components/ContextMenuTrigger.svelte';
  import ContextMenuContent from '../lib/components/ContextMenuContent.svelte';
  import ContextMenuItem from '../lib/components/ContextMenuItem.svelte';
  import ContextMenuSeparator from '../lib/components/ContextMenuSeparator.svelte';
  import ContextMenuShortcut from '../lib/components/ContextMenuShortcut.svelte';
  import ContextMenuPortal from '../lib/components/ContextMenuPortal.svelte';

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
        RIGHT-CLICK HERE
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent>
        <ContextMenuItem onclick={() => console.log('edit')}>
          <Pencil size={14} strokeWidth={2.5} class="opacity-70" />
          Edit
          <ContextMenuShortcut>Ctrl+E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onclick={() => console.log('copy')}>
          <Copy size={14} strokeWidth={2.5} class="opacity-70" />
          Copy
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onclick={() => console.log('cut')}>
          <Scissors size={14} strokeWidth={2.5} class="opacity-70" />
          Cut
          <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onclick={() => console.log('paste')}>
          <Clipboard size={14} strokeWidth={2.5} class="opacity-70" />
          Paste
          <ContextMenuShortcut>Ctrl+V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onclick={() => console.log('delete')}>
          <Trash2 size={14} strokeWidth={2.5} class="opacity-70" />
          Delete
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenu>
</div>
