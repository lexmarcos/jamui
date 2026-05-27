import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type ContextMenuRootContext = {
  open: boolean;
  position: { x: number; y: number };
  setOpen: (open: boolean) => void;
  setPosition: (x: number, y: number) => void;
  closeAll: () => void;
};

export const CONTEXT_MENU_ROOT = Symbol('context-menu-root');

export type ContextMenuContentContext = {
  registerItem: (node: HTMLButtonElement, disabled: boolean) => number;
  unregisterItem: (node: HTMLButtonElement) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  close: () => void;
  menuRef: HTMLDivElement | null;
};

export const CONTEXT_MENU_CONTENT = Symbol('context-menu-content');

export type ContextMenuSubContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: HTMLButtonElement | null;
  setTriggerRef: (node: HTMLButtonElement | null) => void;
  scheduleClose: () => void;
  cancelClose: () => void;
};

export const CONTEXT_MENU_SUB = Symbol('context-menu-sub');

export type ContextMenuRadioGroupContext = {
  value: string;
  onValueChange: (value: string) => void;
};

export const CONTEXT_MENU_RADIO_GROUP = Symbol('context-menu-radio-group');

export type ContextMenuTriggerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type ContextMenuContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  alignOffset?: number;
  sideOffset?: number;
};

export type ContextMenuItemProps = Omit<HTMLButtonAttributes, 'class' | 'onclick'> & {
  children?: Snippet;
  class?: string;
  destructive?: boolean;
  disabled?: boolean;
  onclick?: (e: MouseEvent) => void;
};

export type ContextMenuCheckboxItemProps = Omit<HTMLButtonAttributes, 'class' | 'onclick'> & {
  children?: Snippet;
  checked?: boolean;
  class?: string;
  disabled?: boolean;
  oncheckedchange?: (checked: boolean) => void;
};

export type ContextMenuRadioGroupProps = {
  children?: Snippet;
  value: string;
  onvaluechange?: (value: string) => void;
};

export type ContextMenuRadioItemProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
  disabled?: boolean;
  value: string;
};

export type ContextMenuShortcutProps = Omit<HTMLAttributes<HTMLSpanElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type ContextMenuSeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  class?: string;
};

export type ContextMenuGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type ContextMenuLabelProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type ContextMenuSubTriggerProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
  disabled?: boolean;
};

export type ContextMenuSubContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};
