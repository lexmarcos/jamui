import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export type CheckboxProps = Omit<HTMLInputAttributes, 'class' | 'type'> & {
  /** Bindable checked state. */
  checked?: boolean;
  children?: Snippet;
  class?: string;
  /** Show indeterminate (minus) state regardless of checked. */
  indeterminate?: boolean;
  label?: string;
};
