<script lang="ts">
  import AlertDialogContent from '../lib/components/AlertDialogContent.svelte';
  import AlertDialogHeader from '../lib/components/AlertDialogHeader.svelte';
  import AlertDialogTitle from '../lib/components/AlertDialogTitle.svelte';
  import AlertDialogDescription from '../lib/components/AlertDialogDescription.svelte';
  import AlertDialogFooter from '../lib/components/AlertDialogFooter.svelte';
  import AlertDialogCancel from '../lib/components/AlertDialogCancel.svelte';
  import AlertDialogAction from '../lib/components/AlertDialogAction.svelte';

  type PreviewProps = {
    title?: string;
    description?: string;
    cancelLabel?: string;
    actionLabel?: string;
    open?: boolean;
  };

  let {
    title = 'DELETE ACCOUNT',
    description = 'This action cannot be undone. Your account and all associated data will be permanently removed.',
    cancelLabel = 'CANCEL',
    actionLabel = 'DELETE',
    open = false,
  }: PreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; min-height: 20rem; background: var(--color-jam-bg); padding: 2rem; display: flex; justify-content: center; align-items: center;"
>
  <button
    type="button"
    class="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-none border border-jam-text bg-jam-text px-4 font-black uppercase tracking-[0.2em] text-jam-bg text-xs transition-all duration-150 ease-out hover:shadow-jam-hard-md active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg"
    onclick={() => (open = true)}
  >
    OPEN DIALOG
  </button>

  <AlertDialogContent bind:open>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>{description}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
      <AlertDialogAction>{actionLabel}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</div>
