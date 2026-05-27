import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export type DrawerContext = {
  open: boolean;
  position: DrawerPosition;
  setOpen: (v: boolean) => void;
  close: () => void;
};

export type DrawerTriggerProps = {
  onclick: (e: MouseEvent) => void;
  onkeydown: (e: KeyboardEvent) => void;
  'aria-haspopup': 'dialog';
  'aria-expanded': boolean;
  'aria-controls': string;
  ref: (el: HTMLElement | null) => void;
};

export type DrawerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  open?: boolean;
  position?: DrawerPosition;
  trigger: Snippet<[DrawerTriggerProps]>;
};

export type DrawerContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'role' | 'aria-modal'> & {
  children?: Snippet;
  class?: string;
};

export type DrawerHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DrawerFooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DrawerCloseProps = Omit<HTMLButtonAttributes, 'class' | 'onclick'> & {
  children?: Snippet;
  class?: string;
};

export const DRAWER_CONTEXT = Symbol('drawer');
