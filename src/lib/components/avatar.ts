import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  class?: string;
  src?: string;
  alt?: string;
  fallback?: Snippet;
  size?: AvatarSize;
};
