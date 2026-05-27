import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type DialogButtonChildProps = Omit<HTMLButtonAttributes, 'class'> & {
  class?: string;
};

export type DialogProps = {
  children?: Snippet;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

export type DialogTriggerProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  child?: Snippet<[{ props: DialogButtonChildProps }]>;
  class?: string;
  asChild?: boolean;
};

export type DialogPortalProps = {
  children?: Snippet;
};

export type DialogOverlayProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  class?: string;
};

export type DialogContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  size?: DialogSize;
  closeOnOverlayClick?: boolean;
};

export type DialogHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DialogTitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DialogDescriptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DialogFooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type DialogCloseProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  child?: Snippet<[{ props: DialogButtonChildProps }]>;
  class?: string;
  asChild?: boolean;
};

export type DialogContext = {
  open: boolean;
  setOpen: (value: boolean) => void;
  close: () => void;
  modal: boolean;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id: string | undefined) => void;
  setDescriptionId: (id: string | undefined) => void;
  contentRef?: HTMLDivElement | null;
  setContentRef: (ref: HTMLDivElement | null) => void;
};

export const DIALOG_CONTEXT = Symbol('dialog');
