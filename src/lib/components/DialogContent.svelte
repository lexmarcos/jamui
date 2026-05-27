<script lang="ts">
  import { getContext, tick } from 'svelte';
  import { DIALOG_CONTEXT, type DialogContentProps, type DialogContext, type DialogSize } from './dialog-base';

  let {
    children,
    class: className = '',
    size = 'md',
    closeOnOverlayClick = true,
    ...rest
  }: DialogContentProps = $props();

  const ctx = getContext<DialogContext>(DIALOG_CONTEXT);

  let visible = $state(false);
  let animating = $state(false);
  let contentRef = $state<HTMLDivElement | null>(null);
  let previousActiveElement = $state<Element | null>(null);

  const sizeClasses: Record<DialogSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full h-full'
  };
  const focusableSelector =
    'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

  const baseClass = 'fixed inset-x-4 top-1/2 z-[51] mx-auto w-full -translate-y-1/2 border border-jam-bg/15 bg-jam-text p-6 shadow-jam-hard-blue-md transition-all duration-200 ease-out';
  const mergedClass = $derived(`${baseClass} ${sizeClasses[size]} ${className}`.trim());

  function close() {
    ctx?.close();
  }

  function handleOverlayClick(e: MouseEvent) {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      close();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'Tab' && contentRef) {
      const focusable = contentRef.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) {
        e.preventDefault();
        contentRef.focus();
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

  $effect(() => {
    if (ctx?.open) {
      let cancelled = false;
      previousActiveElement = document.activeElement;
      visible = true;

      tick().then(() => {
        if (cancelled) return;
        ctx?.setContentRef(contentRef);
        animating = true;

        tick().then(() => {
          if (cancelled) return;
          const focusable = contentRef?.querySelector<HTMLElement>(focusableSelector);
          (focusable ?? contentRef)?.focus();
        });
      });

      return () => {
        cancelled = true;
      };
    } else {
      animating = false;
      const timer = setTimeout(() => {
        visible = false;
        ctx?.setContentRef(null);
        if (previousActiveElement instanceof HTMLElement) {
          previousActiveElement.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  });

  const overlayVisible = 'opacity-100';
  const overlayHidden = 'opacity-0 pointer-events-none';
  const panelVisible = 'opacity-100 scale-100';
  const panelHidden = 'opacity-0 scale-95 pointer-events-none';
</script>

{#if visible}
  <div
    class="fixed inset-0 z-50 bg-jam-bg/80 transition-opacity duration-200 ease-out {animating ? overlayVisible : overlayHidden}"
    aria-hidden="true"
    onclick={handleOverlayClick}
  ></div>

  <div
    bind:this={contentRef}
    {...rest}
    role="dialog"
    aria-modal={ctx?.modal ? 'true' : undefined}
    aria-labelledby={ctx?.titleId}
    aria-describedby={ctx?.descriptionId}
    tabindex="-1"
    class="{mergedClass} {animating ? panelVisible : panelHidden}"
    onkeydown={handleKeydown}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
