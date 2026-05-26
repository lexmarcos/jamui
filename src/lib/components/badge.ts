import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeStyle = 'filled' | 'outline' | 'soft';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  size?: BadgeSize;
  style?: BadgeStyle;
  variant?: BadgeVariant;
};
