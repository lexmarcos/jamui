import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type EmptyVariant = 'default' | 'no-data' | 'no-results' | 'error';
export type EmptySize = 'sm' | 'md' | 'lg';

export type EmptyProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'title'> & {
  children?: Snippet;
  class?: string;
  description?: string;
  icon?: Snippet;
  size?: EmptySize;
  title?: string;
  variant?: EmptyVariant;
};
