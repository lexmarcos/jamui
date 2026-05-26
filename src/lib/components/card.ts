import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type CardVariant = 'default' | 'filled' | 'bordered' | 'elevated';
export type CardSize = 'sm' | 'md' | 'lg';

export type CardContext = {
  variant: CardVariant;
  size: CardSize;
};

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  size?: CardSize;
  variant?: CardVariant;
};

export type CardHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type CardBodyProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type CardFooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export const CARD_CONTEXT = Symbol('card');
