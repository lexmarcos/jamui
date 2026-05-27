<script lang="ts">
  import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from '../lib';

  let { open = false }: { open?: boolean } = $props();
</script>

<div class="jamui-root flex min-h-screen items-center justify-center bg-jam-bg p-8">
  <Dialog bind:open>
    <DialogTrigger asChild>
      {#snippet child({ props })}
        <Button {...props} variant="primary">Open Dialog</Button>
      {/snippet}
    </DialogTrigger>
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description. You can close it by clicking the close button, pressing Escape, or clicking the overlay.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Cancel</Button>
            {/snippet}
          </DialogClose>
          <DialogClose asChild>
            {#snippet child({ props })}
              <Button {...props} variant="primary">Confirm</Button>
            {/snippet}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </Dialog>
</div>
