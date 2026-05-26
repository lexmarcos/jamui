import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type AlertDialogContentProps = {
  children?: Snippet;
  class?: string;
  open?: boolean;
  onopenchange?: (open: boolean) => void;
};

export type AlertDialogHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogTitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogDescriptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogFooterProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogCancelProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogActionProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type AlertDialogContext = {
  close: () => void;
};

export const ALERT_DIALOG_CONTEXT = Symbol('alert-dialog');
