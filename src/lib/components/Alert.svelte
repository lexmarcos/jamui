<script lang="ts">
  import { Info, CircleCheck, AlertTriangle, CircleX, X } from '@lucide/svelte';
  import type { AlertProps, AlertVariant } from './alert';

  const baseClass =
    'relative flex items-start gap-3 border border-jam-bg/15 bg-jam-text p-4 font-jam-mono text-jam-bg shadow-jam-hard-blue-sm';

  const statusBarClass: Record<AlertVariant, string> = {
    info: 'bg-[#00b7c3]',
    success: 'bg-[#22c55e]',
    warning: 'bg-[#f59e0b]',
    danger: 'bg-jam-danger'
  };

  const iconComponent: Record<AlertVariant, typeof Info> = {
    info: Info,
    success: CircleCheck,
    warning: AlertTriangle,
    danger: CircleX
  };

  const iconColorClass: Record<AlertVariant, string> = {
    info: 'text-[#00b7c3]',
    success: 'text-[#22c55e]',
    warning: 'text-[#f59e0b]',
    danger: 'text-jam-danger'
  };

  let {
    children,
    class: className = '',
    description = '',
    dismissible = false,
    title = '',
    variant = 'info',
    visible = $bindable(true),
    ondismiss,
    ...rest
  }: AlertProps = $props();

  const mergedClass = $derived(`${baseClass} ${className}`.trim());
  const Icon = $derived(iconComponent[variant]);

  function handleDismiss() {
    visible = false;
    ondismiss?.();
  }
</script>

{#if visible}
  <div {...rest} class={mergedClass} role="alert">
    <!-- Status bar -->
    <div class="absolute left-0 top-0 h-full w-1.5 {statusBarClass[variant]}"></div>

    <!-- Icon -->
    <span class="flex h-5 w-5 shrink-0 items-center justify-center {iconColorClass[variant]}" aria-hidden="true">
      <Icon size={18} strokeWidth={2.5} />
    </span>

    <!-- Content -->
    <div class="grid min-w-0 flex-1 gap-1 pt-0.5">
      {#if children}
        {@render children()}
      {:else}
        {#if title}
          <p class="text-[11px] font-black uppercase tracking-[0.18em] text-jam-bg">
            {title}
          </p>
        {/if}
        {#if description}
          <p class="text-xs font-medium leading-relaxed text-jam-bg/75">
            {description}
          </p>
        {/if}
      {/if}
    </div>

    <!-- Dismiss button -->
    {#if dismissible}
      <button
        type="button"
        class="-mr-1 -mt-1 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-none border border-jam-bg/20 bg-transparent text-jam-bg/70 transition-colors duration-150 hover:border-jam-bg hover:bg-jam-bg/10 hover:text-jam-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-bg focus-visible:ring-offset-2 focus-visible:ring-offset-jam-text"
        aria-label="Dismiss"
        onclick={handleDismiss}
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    {/if}
  </div>
{/if}
