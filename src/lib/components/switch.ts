import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchVariant = 'default' | 'success' | 'warning' | 'danger';

export type SwitchProps = Omit<HTMLInputAttributes, 'class' | 'role' | 'size' | 'type'> & {
  checked?: boolean;
  children?: Snippet;
  class?: string;
  description?: string;
  label?: string;
  size?: SwitchSize;
  variant?: SwitchVariant;
};
