<script lang="ts">
  import type { SwitchProps, SwitchSize, SwitchVariant } from './switch';

  const trackSizeClass: Record<SwitchSize, string> = {
    sm: 'h-6 w-11',
    md: 'h-8 w-14',
    lg: 'h-10 w-[4.5rem]'
  };

  const thumbSizeClass: Record<SwitchSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const thumbTranslateClass: Record<SwitchSize, string> = {
    sm: 'translate-x-5',
    md: 'translate-x-6',
    lg: 'translate-x-8'
  };

  const checkedTrackClass: Record<SwitchVariant, string> = {
    default: 'border-jam-text bg-jam-text shadow-jam-hard-sm',
    success: 'border-[#22c55e] bg-[#22c55e] shadow-[6px_6px_0_rgba(34,197,94,0.3)]',
    warning: 'border-[#f59e0b] bg-[#f59e0b] shadow-[6px_6px_0_rgba(245,158,11,0.3)]',
    danger: 'border-jam-danger bg-jam-danger shadow-[6px_6px_0_rgba(232,17,35,0.35)]'
  };

  let {
    checked = $bindable(false),
    children,
    class: className = '',
    description = '',
    disabled = false,
    id,
    label = '',
    size = 'md',
    value = 'on',
    variant = 'default',
    ...rest
  }: SwitchProps = $props();

  const labelTextClass = $derived(disabled ? 'text-jam-muted/45' : 'text-jam-text');
  const descriptionClass = $derived(disabled ? 'text-jam-muted/35' : 'text-jam-soft/75');
  const trackStateClass = $derived(
    disabled
      ? 'cursor-not-allowed border-jam-text/20 bg-jam-input/40 shadow-none'
      : checked
        ? checkedTrackClass[variant]
        : 'border-jam-text/35 bg-jam-input hover:border-jam-text/60'
  );
  const thumbStateClass = $derived(
    disabled
      ? 'bg-jam-text/35'
      : checked && variant === 'default'
        ? 'bg-jam-bg'
        : 'bg-jam-text'
  );
  const mergedTrackClass = $derived(
    `inline-flex shrink-0 items-center rounded-none border-2 box-border p-0.5 transition-all duration-150 ease-out ${trackSizeClass[size]} ${trackStateClass}`.trim()
  );
  const mergedThumbClass = $derived(
    `pointer-events-none block rounded-none transition-transform duration-150 ease-out ${thumbSizeClass[size]} ${thumbStateClass} ${checked ? thumbTranslateClass[size] : ''}`.trim()
  );
  const hasText = $derived(Boolean(children || label || description));
  const cursorClass = $derived(disabled ? 'cursor-not-allowed' : 'cursor-pointer');
</script>

<label
  class={`inline-flex min-w-0 items-start gap-3 font-jam-mono select-none ${cursorClass} ${className}`.trim()}
>
  <input
    {...rest}
    type="checkbox"
    role="switch"
    bind:checked
    {disabled}
    {id}
    {value}
    aria-label={!hasText ? 'Switch' : undefined}
    class="sr-only peer"
  />

  <span
    class="{mergedTrackClass} peer-focus-visible:ring-2 peer-focus-visible:ring-jam-text peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-jam-bg"
    aria-hidden="true"
  >
    <span class={mergedThumbClass}></span>
  </span>

  {#if hasText}
    <span class="grid min-w-0 gap-1 pt-0.5">
      {#if children}
        <span class="text-xs font-black leading-tight uppercase tracking-[0.16em] {labelTextClass}">
          {@render children()}
        </span>
      {:else if label}
        <span class="text-xs font-black leading-tight uppercase tracking-[0.16em] {labelTextClass}">
          {label}
        </span>
      {/if}

      {#if description}
        <span class="text-[11px] font-medium leading-snug tracking-[0.06em] {descriptionClass}">
          {description}
        </span>
      {/if}
    </span>
  {/if}
</label>
