import type { HTMLAttributes } from 'svelte/elements';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorVariant = 'default' | 'muted' | 'strong' | 'dashed' | 'dotted';
export type SeparatorSize = 'sm' | 'md' | 'lg';

export type SeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  class?: string;
  decorative?: boolean;
  orientation?: SeparatorOrientation;
  size?: SeparatorSize;
  variant?: SeparatorVariant;
};
