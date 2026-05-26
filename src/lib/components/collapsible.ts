import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type CollapsibleVariant = 'default' | 'ghost' | 'bordered';

export type CollapsibleContext = {
  open: boolean;
  toggle: () => void;
  panelId: string;
  variant: CollapsibleVariant;
};

export type CollapsibleProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  open?: boolean;
  variant?: CollapsibleVariant;
};

export type CollapsibleTriggerProps = Omit<HTMLButtonAttributes, 'class' | 'onclick' | 'aria-expanded' | 'aria-controls'> & {
  children?: Snippet;
  class?: string;
};

export type CollapsiblePanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role'> & {
  children?: Snippet;
  class?: string;
};

export const COLLAPSIBLE_CONTEXT = Symbol('collapsible');
