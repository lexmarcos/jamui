import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

export type PopoverContext = {
  close: () => void;
};

export type PopoverTriggerProps = {
  onclick: (e: MouseEvent) => void;
  onkeydown: (e: KeyboardEvent) => void;
  'aria-haspopup': 'dialog';
  'aria-expanded': boolean;
  'aria-controls': string;
  ref: (el: HTMLElement | null) => void;
};

export type PopoverProps = {
  children?: Snippet;
  trigger: Snippet<[PopoverTriggerProps]>;
  class?: string;
  open?: boolean;
  position?: PopoverPosition;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;
  onopenchange?: (open: boolean) => void;
};

export type PopoverCloseProps = Omit<HTMLButtonAttributes, 'class' | 'onclick'> & {
  children?: Snippet;
  class?: string;
};

export type PopoverAnchorProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type PopoverAnchorContext = {
  registerAnchor: (el: HTMLElement | null) => void;
};

export const POPOVER_CONTEXT = Symbol('popover');
export const POPOVER_ANCHOR_CONTEXT = Symbol('popover-anchor');
