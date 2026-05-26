<script lang="ts">
  import type { ProgressProps, ProgressSize, ProgressVariant } from './progress';

  const trackClass: Record<ProgressSize, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const variantFillClass: Record<ProgressVariant, string> = {
    default: 'bg-jam-text',
    success: 'bg-[#22c55e]',
    warning: 'bg-[#f59e0b]',
    danger: 'bg-jam-danger'
  };

  let {
    class: className = '',
    label = '',
    max = 100,
    size = 'md',
    value = 0,
    variant = 'default'
  }: ProgressProps = $props();

  const clampedValue = $derived(Math.min(Math.max(value, 0), max));
  const percentage = $derived(max === 0 ? 0 : Math.round((clampedValue / max) * 100));
  const indeterminate = $derived(value === null || value === undefined);
</script>

<div class={`grid min-w-0 gap-2 ${className}`.trim()}>
  {#if label}
    <div class="flex items-center justify-between">
      <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
        {label}
      </span>
      {#if !indeterminate}
        <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
          {percentage}%
        </span>
      {/if}
    </div>
  {/if}

  <div
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : clampedValue}
    aria-valuemax={max}
    aria-valuemin={0}
    aria-label={label || 'Progresso'}
    class="relative w-full overflow-hidden bg-jam-surface {trackClass[size]}"
  >
    {#if indeterminate}
      <div class="absolute inset-0 bg-jam-text/30">
        <div class="absolute inset-0 w-full animate-progress-indeterminate bg-jam-text"></div>
      </div>
    {:else}
      <div
        class="h-full transition-[width] duration-300 ease-out {variantFillClass[variant]}"
        style="width: {percentage}%"
      ></div>
    {/if}
  </div>
</div>

<style>
  @keyframes progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  :global(.animate-progress-indeterminate) {
    animation: progress-indeterminate 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
</style>
