<script lang="ts">
  import { setContext, tick } from 'svelte';
  import { ALERT_DIALOG_CONTEXT, type AlertDialogContentProps } from './dialog';

  let {
    children,
    class: className = '',
    open = $bindable(false),
    onopenchange,
  }: AlertDialogContentProps = $props();

  let visible = $state(false);
  let animating = $state(false);
  let contentRef = $state<HTMLDivElement | null>(null);
  let previousActiveElement = $state<Element | null>(null);

  function close() {
    onopenchange?.(false);
    open = false;
  }

  $effect(() => {
    if (open) {
      previousActiveElement = document.activeElement;
      visible = true;
      tick().then(() => {
        animating = true;
        tick().then(() => {
          const focusable = contentRef?.querySelector<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          focusable?.focus();
        });
      });
    } else {
      animating = false;
      const timer = setTimeout(() => {
        visible = false;
        if (previousActiveElement instanceof HTMLElement) {
          previousActiveElement.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'Tab' && contentRef) {
      const focusable = contentRef.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  setContext(ALERT_DIALOG_CONTEXT, {
    get close() { return close; }
  });

  const overlayBase =
    'fixed inset-0 z-50 bg-jam-bg/80 px-4 transition-opacity duration-200 ease-out';
  const overlayVisible = 'opacity-100';
  const overlayHidden = 'opacity-0 pointer-events-none';

  const panelBase =
    'fixed inset-x-4 top-1/2 z-[51] mx-auto w-full max-w-md -translate-y-1/2 border border-jam-bg/15 bg-jam-text p-6 shadow-jam-hard-blue-md transition-all duration-200 ease-out';
  const panelVisible = 'opacity-100 scale-100';
  const panelHidden = 'opacity-0 scale-95 pointer-events-none';
</script>

{#if visible}
  <div
    class={`${overlayBase} ${animating ? overlayVisible : overlayHidden}`}
    aria-hidden="true"
  ></div>

  <div
    bind:this={contentRef}
    role="alertdialog"
    aria-modal="true"
    tabindex="-1"
    class={`${panelBase} ${animating ? panelVisible : panelHidden} ${className}`}
    onkeydown={handleKeydown}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
