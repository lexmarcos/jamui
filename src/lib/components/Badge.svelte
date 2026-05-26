<script lang="ts">
  import type { BadgeProps, BadgeSize, BadgeStyle, BadgeVariant } from './badge';

  const sizeClass: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px] tracking-[0.14em]',
    md: 'px-3 py-1 text-[11px] tracking-[0.16em]'
  };

  const variantFilledClass: Record<BadgeVariant, string> = {
    default: 'bg-jam-text text-jam-bg',
    success: 'bg-[#22c55e] text-jam-text',
    warning: 'bg-[#f59e0b] text-jam-bg',
    danger: 'bg-jam-danger text-jam-text',
    info: 'bg-[#00b7c3] text-jam-text'
  };

  const variantOutlineClass: Record<BadgeVariant, string> = {
    default: 'border-jam-text text-jam-text',
    success: 'border-[#22c55e] text-[#22c55e]',
    warning: 'border-[#f59e0b] text-[#f59e0b]',
    danger: 'border-jam-danger text-jam-danger',
    info: 'border-[#00b7c3] text-[#00b7c3]'
  };

  const variantSoftClass: Record<BadgeVariant, string> = {
    default: 'bg-jam-text/10 text-jam-text',
    success: 'bg-[#22c55e]/10 text-[#22c55e]',
    warning: 'bg-[#f59e0b]/10 text-[#f59e0b]',
    danger: 'bg-jam-danger/10 text-jam-danger',
    info: 'bg-[#00b7c3]/10 text-[#00b7c3]'
  };

  let {
    children,
    class: className = '',
    size = 'md',
    style = 'filled',
    variant = 'default',
    ...rest
  }: BadgeProps = $props();

  const styleVariantClass = $derived(
    style === 'filled'
      ? variantFilledClass[variant]
      : style === 'outline'
        ? `border bg-transparent ${variantOutlineClass[variant]}`
        : variantSoftClass[variant]
  );
</script>

<span
  {...rest}
  class={`inline-flex items-center justify-center rounded-none font-black uppercase font-jam-mono ${sizeClass[size]} ${styleVariantClass} ${className}`.trim()}
>
  {#if children}
    {@render children()}
  {/if}
</span>
