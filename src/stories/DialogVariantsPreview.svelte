<script lang="ts">
  import {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    Button,
    TextInput,
    Textarea
  } from '../lib';

  let confirmationOpen = $state(false);
  let formOpen = $state(false);
  let destructiveOpen = $state(false);
  let fullscreenOpen = $state(false);
  let noOverlayCloseOpen = $state(false);
  let smallOpen = $state(false);
  let largeOpen = $state(false);
  let xlOpen = $state(false);

  let formName = $state('');
  let formEmail = $state('');
  let formMessage = $state('');
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-8">
  <div class="mx-auto max-w-4xl space-y-8">
    <h1 class="text-2xl font-black uppercase tracking-wider text-jam-text">Dialog Variants</h1>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Basic Dialog</h2>
      <div class="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="primary">Default (md)</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Default Dialog</DialogTitle>
                <DialogDescription>
                  This is a medium-sized dialog with default settings.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="secondary">Close</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={smallOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Small</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Small Dialog</DialogTitle>
                <DialogDescription>
                  This is a small-sized dialog.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={largeOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Large</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Large Dialog</DialogTitle>
                <DialogDescription>
                  This is a large-sized dialog with more space for content.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        <Dialog bind:open={xlOpen}>
          <DialogTrigger asChild>
            {#snippet child({ props })}
              <Button {...props} variant="secondary">Extra Large</Button>
            {/snippet}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent size="xl">
              <DialogHeader>
                <DialogTitle>Extra Large Dialog</DialogTitle>
                <DialogDescription>
                  This is an extra large dialog with maximum width for complex content.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="primary">OK</Button>
                  {/snippet}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Confirmation Dialog</h2>
      <Dialog bind:open={confirmationOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Open Confirmation</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed? This action cannot be undone.
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

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Form Dialog</h2>
      <Dialog bind:open={formOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Open Form</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Contact Form</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you soon.
              </DialogDescription>
            </DialogHeader>
            <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); formOpen = false; }}>
              <TextInput label="Name" bind:value={formName} placeholder="John Doe" />
              <TextInput label="Email" type="email" bind:value={formEmail} placeholder="john@example.com" />
              <Textarea label="Message" bind:value={formMessage} placeholder="Your message..." rows={4} />
              <DialogFooter>
                <DialogClose asChild>
                  {#snippet child({ props })}
                    <Button {...props} variant="secondary" type="button">Cancel</Button>
                  {/snippet}
                </DialogClose>
                <Button variant="primary" type="submit">Send Message</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Destructive Dialog</h2>
      <Dialog bind:open={destructiveOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="danger">Delete Item</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.
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
                  <Button {...props} variant="danger">Delete</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">Fullscreen Dialog</h2>
      <Dialog bind:open={fullscreenOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Open Fullscreen</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent size="full" class="h-screen max-h-screen">
            <DialogHeader>
              <DialogTitle>Fullscreen Dialog</DialogTitle>
              <DialogDescription>
                This dialog takes up the entire screen. Perfect for complex workflows or detailed views.
              </DialogDescription>
            </DialogHeader>
            <div class="flex-1 overflow-auto py-4">
              <p class="text-sm text-jam-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="secondary">Close</Button>
                {/snippet}
              </DialogClose>
              <DialogClose asChild>
                {#snippet child({ props })}
                  <Button {...props} variant="primary">Save Changes</Button>
                {/snippet}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>

    <div class="grid gap-4">
      <h2 class="text-lg font-bold uppercase tracking-wide text-jam-text">No Overlay Close</h2>
      <Dialog bind:open={noOverlayCloseOpen}>
        <DialogTrigger asChild>
          {#snippet child({ props })}
            <Button {...props} variant="primary">Open (No Overlay Close)</Button>
          {/snippet}
        </DialogTrigger>
        <DialogPortal>
          <DialogContent closeOnOverlayClick={false}>
            <DialogHeader>
              <DialogTitle>Important Action Required</DialogTitle>
              <DialogDescription>
                This dialog cannot be closed by clicking the overlay. You must use the buttons below or press Escape.
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
  </div>
</div>
