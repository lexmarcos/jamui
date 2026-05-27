<script lang="ts">
  import { setContext, untrack } from 'svelte';
  import { DIALOG_CONTEXT, type DialogProps, type DialogContext } from './dialog-base';

  let {
    children,
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    modal = true
  }: DialogProps = $props();

  let internalOpen = $state(untrack(() => defaultOpen));
  let titleId = $state<string | undefined>();
  let descriptionId = $state<string | undefined>();
  let contentRef = $state<HTMLDivElement | null>(null);

  const isControlled = $derived(open !== undefined);
  const isOpen = $derived(isControlled ? (open ?? false) : internalOpen);

  function setOpen(value: boolean) {
    if (isControlled) {
      open = value;
      onOpenChange?.(value);
    } else {
      internalOpen = value;
      onOpenChange?.(value);
    }
  }

  function close() {
    setOpen(false);
  }

  setContext<DialogContext>(DIALOG_CONTEXT, {
    get open() { return isOpen; },
    setOpen,
    close,
    get modal() { return modal; },
    get titleId() { return titleId; },
    get descriptionId() { return descriptionId; },
    setTitleId: (id: string | undefined) => { titleId = id; },
    setDescriptionId: (id: string | undefined) => { descriptionId = id; },
    get contentRef() { return contentRef; },
    setContentRef: (ref: HTMLDivElement | null) => { contentRef = ref; }
  });
</script>

{#if children}
  {@render children()}
{/if}
