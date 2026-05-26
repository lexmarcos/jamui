<script lang="ts">
  import type { ButtonProps, ButtonSize, ButtonVariant } from './button';

  const baseClass =
    'inline-flex min-w-0 cursor-pointer items-center justify-center rounded-none border font-black uppercase transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-jam-text focus-visible:ring-offset-2 focus-visible:ring-offset-jam-bg disabled:pointer-events-none disabled:cursor-not-allowed disabled:shadow-none disabled:active:shadow-none';

  const sizeClass: Record<ButtonSize, string> = {
    sm: 'min-h-9 px-3 text-[10px] tracking-[0.22em]',
    md: 'min-h-12 px-4 text-xs tracking-[0.2em]',
    lg: 'min-h-14 px-5 text-sm tracking-[0.24em]'
  };

  const variantClass: Record<ButtonVariant, string> = {
    primary:
      'border-jam-text bg-jam-text text-jam-bg hover:shadow-jam-hard-md active:shadow-none active:bg-jam-muted disabled:border-jam-text/20 disabled:bg-jam-text/15 disabled:text-jam-text/40',
    secondary:
      'border-jam-text/40 bg-jam-surface text-jam-text hover:border-jam-text hover:bg-jam-text hover:text-jam-bg hover:shadow-jam-hard-sm active:shadow-none active:bg-jam-muted active:text-jam-bg disabled:border-jam-text/20 disabled:bg-jam-surface/30 disabled:text-jam-text/30',
    ghost:
      'border-jam-text/25 bg-transparent text-jam-muted hover:border-jam-text hover:bg-jam-text/10 hover:text-jam-text hover:shadow-jam-hard-sm active:shadow-none active:bg-jam-text/15 disabled:border-jam-text/15 disabled:bg-transparent disabled:text-jam-text/20',
    danger:
      'border-jam-danger bg-jam-danger text-jam-text hover:shadow-[8px_8px_0_rgba(232,17,35,0.35)] active:shadow-none active:bg-[#c00f1b] disabled:border-jam-danger/25 disabled:bg-jam-danger/15 disabled:text-jam-text/40'
  };

  let {
    children,
    class: className = '',
    disabled = false,
    ref,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...rest
  }: ButtonProps = $props();

  const buttonClass = $derived(
    `${baseClass} ${sizeClass[size]} ${variantClass[variant]} ${className}`.trim()
  );

  let buttonRef = $state<HTMLButtonElement | null>(null);

  $effect(() => {
    ref?.(buttonRef);
  });
</script>

<button bind:this={buttonRef} {...rest} {disabled} {type} class={buttonClass}>
  {#if children}
    {@render children()}
  {/if}
</button>
