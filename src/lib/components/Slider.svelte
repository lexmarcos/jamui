<script lang="ts">
  import type { SliderProps, SliderSize, SliderVariant } from './slider';

  const trackHeight: Record<SliderSize, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const thumbSize: Record<SliderSize, string> = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const fillClass: Record<SliderVariant, string> = {
    default: 'bg-jam-text',
    success: 'bg-[#22c55e]',
    warning: 'bg-[#f59e0b]',
    danger: 'bg-jam-danger'
  };

  const thumbBorderClass: Record<SliderVariant, string> = {
    default: 'border-jam-bg',
    success: 'border-[#22c55e]',
    warning: 'border-[#f59e0b]',
    danger: 'border-jam-danger'
  };

  let {
    class: className = '',
    label = '',
    max = 100,
    min = 0,
    size = 'md',
    step = 1,
    value = $bindable(min),
    variant = 'default'
  }: SliderProps = $props();

  let trackRef = $state<HTMLDivElement | null>(null);
  let dragging = $state(false);

  const clampedValue = $derived(Math.min(Math.max(value, min), max));
  const percentage = $derived(max === min ? 0 : ((clampedValue - min) / (max - min)) * 100);

  function setValueFromClientX(clientX: number) {
    if (!trackRef) return;
    const rect = trackRef.getBoundingClientRect();
    const thumbHalf = size === 'sm' ? 7 : size === 'md' ? 10 : 12;
    const trackWidth = rect.width - thumbHalf * 2;
    const raw = ((clientX - rect.left - thumbHalf) / trackWidth) * (max - min) + min;
    const stepped = Math.round(raw / step) * step;
    value = Math.min(Math.max(stepped, min), max);
  }

  function handlePointerDown(e: PointerEvent) {
    dragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setValueFromClientX(e.clientX);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!dragging) return;
    setValueFromClientX(e.clientX);
  }

  function handlePointerUp() {
    dragging = false;
  }

  function handleTrackClick(e: MouseEvent) {
    if (dragging) return;
    setValueFromClientX(e.clientX);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      value = Math.min(clampedValue + step, max);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      value = Math.max(clampedValue - step, min);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      value = Math.min(clampedValue + step * 10, max);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      value = Math.max(clampedValue - step * 10, min);
    } else if (e.key === 'Home') {
      e.preventDefault();
      value = min;
    } else if (e.key === 'End') {
      e.preventDefault();
      value = max;
    }
  }
</script>

<div class={`grid min-w-0 gap-2 ${className}`.trim()}>
  {#if label}
    <div class="flex items-center justify-between">
      <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
        {label}
      </span>
      <span class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">
        {clampedValue}
      </span>
    </div>
  {/if}

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={trackRef}
    class="relative flex cursor-pointer items-center py-3"
    role="slider"
    aria-valuenow={clampedValue}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-label={label || 'Slider'}
    tabindex="0"
    onkeydown={handleKeydown}
    onclick={handleTrackClick}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    onpointerleave={handlePointerUp}
  >
    <!-- Track -->
    <div class="relative w-full {trackHeight[size]} bg-jam-surface overflow-hidden">
      <!-- Fill -->
      <div
        class="absolute left-0 top-0 h-full {fillClass[variant]} transition-[width] duration-75 ease-out"
        style="width: {percentage}%"
      ></div>
    </div>

    <!-- Thumb -->
    <div
      class="absolute top-1/2 -translate-y-1/2 {thumbSize[size]} cursor-grab rounded-none border-2 bg-jam-text transition-shadow duration-150 ease-out hover:shadow-jam-hard-sm active:cursor-grabbing active:shadow-none {thumbBorderClass[variant]}"
      style="left: calc({percentage}% - {size === 'sm' ? '7px' : size === 'md' ? '10px' : '12px'})"
    ></div>
  </div>
</div>
