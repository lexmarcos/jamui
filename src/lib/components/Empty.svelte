<script lang="ts">
  import { PackageOpen, Database, SearchX, AlertTriangle } from '@lucide/svelte';
  import type { EmptyProps, EmptySize, EmptyVariant } from './empty';

  const baseClass =
    'flex flex-col items-center justify-center text-center font-jam-mono';

  const sizeClass: Record<EmptySize, string> = {
    sm: 'gap-1.5 p-3',
    md: 'gap-2 p-6',
    lg: 'gap-3 p-8'
  };

  const iconSizeClass: Record<EmptySize, string> = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };

  const iconStrokeClass: Record<EmptySize, string> = {
    sm: 'stroke-[2.5]',
    md: 'stroke-[2]',
    lg: 'stroke-[1.5]'
  };

  const titleSizeClass: Record<EmptySize, string> = {
    sm: 'text-[10px] tracking-[0.18em]',
    md: 'text-[11px] tracking-[0.18em]',
    lg: 'text-xs tracking-[0.2em]'
  };

  const descriptionSizeClass: Record<EmptySize, string> = {
    sm: 'text-[10px] leading-relaxed',
    md: 'text-xs leading-relaxed',
    lg: 'text-sm leading-relaxed'
  };

  const iconComponent: Record<EmptyVariant, typeof PackageOpen> = {
    default: PackageOpen,
    'no-data': Database,
    'no-results': SearchX,
    error: AlertTriangle
  };

  const iconColorClass: Record<EmptyVariant, string> = {
    default: 'text-jam-soft',
    'no-data': 'text-jam-soft',
    'no-results': 'text-jam-muted',
    error: 'text-jam-danger'
  };

  let {
    children,
    class: className = '',
    description = '',
    icon,
    size = 'md',
    title = '',
    variant = 'default',
    ...rest
  }: EmptyProps = $props();

  const DefaultIcon = $derived(iconComponent[variant]);

  const mergedClass = $derived(
    `${baseClass} ${sizeClass[size]} ${className}`.trim()
  );
</script>

<div {...rest} class={mergedClass}>
  <span class={`flex shrink-0 items-center justify-center ${iconSizeClass[size]} ${iconColorClass[variant]}`} aria-hidden="true">
    {#if icon}
      {@render icon()}
    {:else}
      <DefaultIcon aria-hidden="true" class={iconStrokeClass[size]} size="100%" strokeWidth={2} />
    {/if}
  </span>

  {#if title}
    <p class={`font-black uppercase ${titleSizeClass[size]} text-jam-text`}>
      {title}
    </p>
  {/if}

  {#if description}
    <p class={`font-medium ${descriptionSizeClass[size]} text-jam-muted`}>
      {description}
    </p>
  {/if}

  {#if children}
    <div class="mt-1 flex items-center gap-2">
      {@render children()}
    </div>
  {/if}
</div>
