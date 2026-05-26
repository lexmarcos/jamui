import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<HTMLButtonAttributes, 'class' | 'type'> & {
  children?: Snippet;
  class?: string;
  size?: ButtonSize;
  ref?: (node: HTMLButtonElement | null) => void;
  type?: HTMLButtonAttributes['type'];
  variant?: ButtonVariant;
};
