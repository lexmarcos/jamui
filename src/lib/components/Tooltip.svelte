<script lang="ts">
  import type { TooltipProps, TooltipPosition } from './tooltip';

  let {
    children,
    class: className = '',
    content,
    position = 'top',
    ...rest
  }: TooltipProps = $props();

  let visible = $state(false);
  let tooltipRef = $state<HTMLDivElement | null>(null);

  const positionClass: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClass: Record<TooltipPosition, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-jam-text',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-jam-text',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-jam-text',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-jam-text'
  };

  function show() {
    visible = true;
  }

  function hide() {
    visible = false;
  }

  function handleFocus() {
    show();
  }

  function handleBlur(e: FocusEvent) {
    if (!tooltipRef?.contains(e.relatedTarget as Node)) {
      hide();
    }
  }
</script>

<div
  {...rest}
  class={`relative inline-flex ${className}`.trim()}
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={handleFocus}
  onfocusout={handleBlur}
>
  {#if children}
    {@render children()}
  {/if}

  {#if visible}
    <div
      bind:this={tooltipRef}
      role="tooltip"
      class="absolute z-50 w-max max-w-[16rem] border border-jam-bg/15 bg-jam-text px-2.5 py-1.5 text-[10px] font-bold font-jam-mono uppercase tracking-[0.12em] text-jam-bg shadow-jam-hard-blue-sm {positionClass[position]}"
    >
      {content}
      <!-- Arrow -->
      <span
        class="absolute h-0 w-0 border-4 border-transparent {arrowClass[position]}"
        aria-hidden="true"
      ></span>
    </div>
  {/if}
</div>
