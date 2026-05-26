import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  content: string;
  position?: TooltipPosition;
};
