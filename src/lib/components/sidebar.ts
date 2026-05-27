import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

export type SidebarSide = 'left' | 'right';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type SidebarState = 'expanded' | 'collapsed';
export type SidebarMenuSize = 'sm' | 'md' | 'lg';

export type SidebarContext = {
  /** Desktop state: 'expanded' | 'collapsed'. */
  state: SidebarState;
  /** Desktop open value (true = expanded). */
  open: boolean;
  setOpen: (value: boolean) => void;
  /** Mobile sheet open value. */
  openMobile: boolean;
  setOpenMobile: (value: boolean) => void;
  /** True when the viewport is below `mobileBreakpoint`. */
  isMobile: boolean;
  /** Toggle whichever sidebar (mobile/desktop) is currently relevant. */
  toggle: () => void;
  /** Layout configuration (from Sidebar.svelte; nullable until Sidebar mounts). */
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
  /** Stable id for aria-controls wiring between trigger and panel. */
  panelId: string;
  /** Whether a Sidebar component has registered itself with the provider. */
  registerSidebar: (config: {
    side: SidebarSide;
    variant: SidebarVariant;
    collapsible: SidebarCollapsible;
  }) => void;
};

export const SIDEBAR_CONTEXT = Symbol('jam-sidebar');

export const SIDEBAR_WIDTH_EXPANDED = '16rem';
export const SIDEBAR_WIDTH_ICON = '3.25rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_MOBILE_BREAKPOINT = 768;
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

// ─── Provider ──────────────────────────────────────────────────────────────
export type SidebarProviderProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  /** Controlled desktop open value. Falls back to defaultOpen when undefined. */
  open?: boolean;
  /** Initial desktop open value when uncontrolled. */
  defaultOpen?: boolean;
  /** Notified whenever the desktop open value changes. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled mobile open value. */
  openMobile?: boolean;
  /** Initial mobile open value when uncontrolled. */
  defaultOpenMobile?: boolean;
  /** Notified whenever the mobile open value changes. */
  onOpenMobileChange?: (open: boolean) => void;
  /** Persist desktop state under this key (localStorage). */
  persistKey?: string;
  /** Disable the Ctrl/Cmd+B keyboard shortcut. */
  disableKeyboardShortcut?: boolean;
  /** Width used when the sidebar is expanded. CSS length. */
  widthExpanded?: string;
  /** Width used in collapsible="icon" mode. CSS length. */
  widthCollapsed?: string;
  /** Width of the mobile sheet. CSS length. */
  widthMobile?: string;
  /** Breakpoint in pixels below which the layout flips to mobile. Default 768. */
  mobileBreakpoint?: number;
};

// ─── Sidebar (panel) ───────────────────────────────────────────────────────
export type SidebarProps = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
  children?: Snippet;
  class?: string;
  /** Which edge of the viewport the sidebar sticks to. */
  side?: SidebarSide;
  /** Visual layout. */
  variant?: SidebarVariant;
  /** Collapse strategy. */
  collapsible?: SidebarCollapsible;
  /** Accessible label for the panel. */
  'aria-label'?: string;
};

// ─── Trigger / Rail / Inset ────────────────────────────────────────────────
export type SidebarTriggerProps = Omit<HTMLButtonAttributes, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarRailProps = Omit<HTMLButtonAttributes, 'class'> & {
  class?: string;
  'aria-label'?: string;
};

export type SidebarInsetProps = Omit<HTMLAttributes<HTMLElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

// ─── Section wrappers ──────────────────────────────────────────────────────
export type SidebarSectionProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarSeparatorProps = Omit<HTMLAttributes<HTMLHRElement>, 'class'> & {
  class?: string;
};

// ─── Group ─────────────────────────────────────────────────────────────────
export type SidebarGroupLabelProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarGroupContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

// ─── Menu / MenuItem ───────────────────────────────────────────────────────
export type SidebarMenuProps = Omit<HTMLAttributes<HTMLUListElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarMenuItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarMenuSubProps = Omit<HTMLAttributes<HTMLUListElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

export type SidebarMenuSubItemProps = Omit<HTMLAttributes<HTMLLIElement>, 'class'> & {
  children?: Snippet;
  class?: string;
};

/**
 * MenuButton is polymorphic: renders an <a> when `href` is provided,
 * otherwise a <button>. All extra props pass through to the rendered element.
 */
type SidebarMenuButtonBase = {
  children?: Snippet;
  class?: string;
  /** Highlight the item as the current navigation target. */
  active?: boolean;
  /** Disable the item (aria-disabled + visually muted). */
  disabled?: boolean;
  /** Leading icon snippet (rendered before children). */
  icon?: Snippet;
  /** Trailing badge snippet (rendered after children). */
  badge?: Snippet;
  /** Trailing shortcut hint (e.g. "⌘ K"). */
  shortcut?: string;
  /** Visual density. */
  size?: SidebarMenuSize;
  /** When true, indicates this button toggles a submenu. */
  hasSub?: boolean;
};

export type SidebarMenuButtonProps =
  | (SidebarMenuButtonBase & Omit<HTMLButtonAttributes, 'class' | 'disabled'> & { href?: undefined })
  | (SidebarMenuButtonBase & Omit<HTMLAnchorAttributes, 'class'> & { href: string });

export type SidebarMenuSubButtonProps = SidebarMenuButtonProps;
