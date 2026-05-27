<script lang="ts">
  import type { SeparatorProps, SeparatorSize, SeparatorVariant, SeparatorOrientation } from './separator';

  const orientationBase: Record<SeparatorOrientation, string> = {
    horizontal: 'w-full shrink-0',
    vertical: 'h-full self-stretch shrink-0'
  };

  const sizeSolidClass: Record<SeparatorOrientation, Record<SeparatorSize, string>> = {
    horizontal: {
      sm: 'h-px',
      md: 'h-0.5',
      lg: 'h-1'
    },
    vertical: {
      sm: 'w-px',
      md: 'w-0.5',
      lg: 'w-1'
    }
  };

  const variantColorClass: Record<SeparatorVariant, string> = {
    default: 'bg-jam-text/15',
    muted: 'bg-jam-text/8',
    strong: 'bg-jam-text/30',
    dashed: '',
    dotted: ''
  };

  const dashedDottedHClass: Record<SeparatorVariant, string> = {
    default: '',
    muted: '',
    strong: '',
    dashed: 'h-0 border-t border-dashed border-jam-text/15',
    dotted: 'h-0 border-t border-dotted border-jam-text/15'
  };

  const dashedDottedVClass: Record<SeparatorVariant, string> = {
    default: '',
    muted: '',
    strong: '',
    dashed: 'w-0 border-l border-dashed border-jam-text/15',
    dotted: 'w-0 border-l border-dotted border-jam-text/15'
  };

  let {
    class: className = '',
    decorative = false,
    orientation = 'horizontal',
    size = 'md',
    variant = 'default',
    ...rest
  }: SeparatorProps = $props();

  const isDashedDotted = $derived(variant === 'dashed' || variant === 'dotted');

  const mergedClass = $derived(
    [
      orientationBase[orientation],
      isDashedDotted
        ? orientation === 'horizontal'
          ? dashedDottedHClass[variant]
          : dashedDottedVClass[variant]
        : `${sizeSolidClass[orientation][size]} ${variantColorClass[variant]}`,
      className
    ].filter(Boolean).join(' ').trim()
  );

  const role = $derived(decorative ? undefined : 'separator');
  const ariaOrientation = $derived(decorative ? undefined : orientation);
  const ariaHidden = $derived(decorative ? true : undefined);
</script>

<div
  {...rest}
  role={role}
  aria-orientation={ariaOrientation}
  aria-hidden={ariaHidden}
  class={mergedClass}
></div>
