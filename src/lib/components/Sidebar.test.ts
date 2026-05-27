import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SidebarTestWrapper from './SidebarTestWrapper.svelte';

type MQLChangeHandler = (e: { matches: boolean }) => void;

/**
 * happy-dom does not implement matchMedia; we install a tiny mock that
 * lets us flip between mobile/desktop within a test.
 */
function installMatchMediaMock(initialMobile = false) {
  const listeners: Set<MQLChangeHandler> = new Set();
  let matches = initialMobile;

  function makeMql(query: string) {
    return {
      matches,
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: MQLChangeHandler) => listeners.add(cb),
      removeEventListener: (_: string, cb: MQLChangeHandler) => listeners.delete(cb),
      addListener: (cb: MQLChangeHandler) => listeners.add(cb),
      removeListener: (cb: MQLChangeHandler) => listeners.delete(cb),
      dispatchEvent: () => false
    };
  }

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn((query: string) => makeMql(query))
  });

  return {
    setMobile(value: boolean) {
      matches = value;
      listeners.forEach((cb) => cb({ matches: value }));
    }
  };
}

beforeEach(() => {
  installMatchMediaMock(false);
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
});

describe('Sidebar', () => {
  it('renderiza header, content e footer', () => {
    render(SidebarTestWrapper);

    expect(screen.getByTestId('sidebar-header-content')).toBeTruthy();
    expect(screen.getByTestId('sidebar-footer-content')).toBeTruthy();
    expect(screen.getByText('Workspace')).toBeTruthy();
    expect(screen.getByTestId('inset-main')).toBeTruthy();
  });

  it('abre e fecha pelo trigger', async () => {
    const user = userEvent.setup();
    render(SidebarTestWrapper, { props: { defaultOpen: true } });

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });

    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('chama onOpenChange ao alternar', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(SidebarTestWrapper, { props: { defaultOpen: true, onOpenChange } });

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('funciona em modo controlado (open + onOpenChange)', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(SidebarTestWrapper, {
      props: { open: true, onOpenChange }
    });

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.click(trigger);
    // Internal state should NOT have changed because we're controlled
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(onOpenChange).toHaveBeenCalledWith(false);

    // Now the parent flips `open` to false
    await rerender({ open: false, onOpenChange });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('funciona em modo não controlado (defaultOpen)', async () => {
    const user = userEvent.setup();
    render(SidebarTestWrapper, { props: { defaultOpen: false } });

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('aplica posição left e right via data-side', () => {
    const { rerender, container } = render(SidebarTestWrapper, {
      props: { side: 'left' }
    });

    let panel = container.querySelector('[data-jam-sidebar]');
    expect(panel?.getAttribute('data-side')).toBe('left');

    rerender({ side: 'right' });
    panel = container.querySelector('[data-jam-sidebar]');
    expect(panel?.getAttribute('data-side')).toBe('right');
  });

  it('reserva o espaço no lado correto quando side="right"', () => {
    const { container } = render(SidebarTestWrapper, {
      props: { side: 'right' }
    });

    const gap = container.querySelector('[data-jam-sidebar-gap]');
    expect(gap?.getAttribute('data-side')).toBe('right');
    expect(gap?.classList.contains('order-2')).toBe(true);
  });

  it('aplica variantes sidebar, floating e inset', () => {
    const { rerender, container } = render(SidebarTestWrapper, {
      props: { variant: 'sidebar' }
    });

    const getPanel = () => container.querySelector('[data-jam-sidebar]');
    expect(getPanel()?.getAttribute('data-variant')).toBe('sidebar');

    rerender({ variant: 'floating' });
    expect(getPanel()?.getAttribute('data-variant')).toBe('floating');

    rerender({ variant: 'inset' });
    expect(getPanel()?.getAttribute('data-variant')).toBe('inset');
  });

  it('aplica modos de colapso offcanvas, icon e none', () => {
    const { rerender, container } = render(SidebarTestWrapper, {
      props: { collapsible: 'offcanvas' }
    });

    const getPanel = () => container.querySelector('[data-jam-sidebar]');
    expect(getPanel()?.getAttribute('data-collapsible')).toBe('offcanvas');

    rerender({ collapsible: 'icon' });
    expect(getPanel()?.getAttribute('data-collapsible')).toBe('icon');

    rerender({ collapsible: 'none' });
    expect(getPanel()?.getAttribute('data-collapsible')).toBe('none');
  });

  it('soma o padding do inset à largura do modo icon', () => {
    const { container } = render(SidebarTestWrapper, {
      props: { variant: 'inset', collapsible: 'icon', defaultOpen: false }
    });

    const gap = container.querySelector<HTMLElement>('[data-jam-sidebar-gap]');
    const panel = container.querySelector('[data-jam-sidebar]');

    expect(gap?.classList.contains('w-[calc(var(--jam-sidebar-width-icon)+1rem)]')).toBe(true);
    expect(panel?.classList.contains('w-[calc(var(--jam-sidebar-width-icon)+1rem)]')).toBe(true);
  });

  it('renderiza itens, grupos, separadores e submenus', () => {
    const { container } = render(SidebarTestWrapper);

    expect(container.querySelector('[data-jam-sidebar-group]')).toBeTruthy();
    expect(container.querySelector('[data-jam-sidebar-group-label]')).toBeTruthy();
    expect(container.querySelector('[data-jam-sidebar-separator]')).toBeTruthy();
    expect(container.querySelector('[data-jam-sidebar-menu]')).toBeTruthy();
    expect(container.querySelectorAll('[data-jam-sidebar-menu-item]').length).toBeGreaterThan(0);
    expect(container.querySelector('[data-jam-sidebar-menu-sub]')).toBeTruthy();
    expect(container.querySelectorAll('[data-jam-sidebar-menu-sub-item]').length).toBeGreaterThan(0);
  });

  it('marca item ativo com aria-current="page"', () => {
    render(SidebarTestWrapper, { props: { activeId: 'inbox' } });

    const inbox = screen.getByRole('button', { name: /^inbox/i });
    expect(inbox.getAttribute('aria-current')).toBe('page');
    expect(inbox.getAttribute('data-active')).toBe('true');

    const dashboard = screen.getByRole('button', { name: /^dashboard/i });
    expect(dashboard.getAttribute('aria-current')).toBeNull();
  });

  it('usa cor do background no texto do item ativo', () => {
    render(SidebarTestWrapper, { props: { activeId: 'inbox' } });

    const inbox = screen.getByRole('button', { name: /^inbox/i });
    const classes = Array.from(inbox.classList);

    expect(classes).toContain('text-jam-bg');
    expect(classes).not.toContain('text-jam-text');
  });

  it('respeita itens desabilitados (aria-disabled + disabled)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(SidebarTestWrapper);

    const disabled = screen.getByRole('button', { name: /disabled item/i });
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    expect((disabled as HTMLButtonElement).disabled).toBe(true);

    // user-event refuses to click natively-disabled buttons; assert via click count
    await user.click(disabled);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renderiza item polimórfico como <a> quando href é definido', () => {
    render(SidebarTestWrapper);

    const link = screen.getByRole('link', { name: /^projects/i });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/projects');
  });

  it('fecha com Esc no mobile', async () => {
    const mql = installMatchMediaMock(true);
    void mql;
    const user = userEvent.setup();
    const onOpenMobileChange = vi.fn();
    render(SidebarTestWrapper, {
      props: { onOpenMobileChange, openMobile: true }
    });

    await user.keyboard('{Escape}');
    expect(onOpenMobileChange).toHaveBeenCalledWith(false);
  });

  it('aplica atributos de acessibilidade (aria-label e aria-controls)', () => {
    const { container } = render(SidebarTestWrapper);

    const panel = container.querySelector('[data-jam-sidebar]');
    expect(panel?.getAttribute('aria-label')).toBe('Primary navigation');

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    expect(trigger.getAttribute('aria-controls')).toBe(panel?.id);
  });

  it('expoẽ data-state coerente com open', async () => {
    const user = userEvent.setup();
    const { container } = render(SidebarTestWrapper, { props: { defaultOpen: true } });

    const panel = () => container.querySelector('[data-jam-sidebar]');
    expect(panel()?.getAttribute('data-state')).toBe('expanded');

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    await user.click(trigger);
    expect(panel()?.getAttribute('data-state')).toBe('collapsed');
  });

  it('persiste o estado em localStorage quando persistKey é definido', async () => {
    const user = userEvent.setup();
    render(SidebarTestWrapper, {
      props: { defaultOpen: true, persistKey: 'jam:sidebar:test' }
    });

    const trigger = screen.getByRole('button', { name: /^(open|close) sidebar$/i });
    await user.click(trigger);

    expect(window.localStorage.getItem('jam:sidebar:test')).toBe('false');
  });

  it('alterna com o atalho Ctrl+B', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(SidebarTestWrapper, { props: { defaultOpen: true, onOpenChange } });

    await user.keyboard('{Control>}b{/Control}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('item ativo recebe aria-current também no submenu', () => {
    render(SidebarTestWrapper, { props: { activeId: 'projects/active' } });

    const subItem = screen.getByRole('button', { name: /^active/i });
    expect(subItem.getAttribute('aria-current')).toBe('page');
  });

  it('não mistura cor normal com cor ativa no submenu', () => {
    render(SidebarTestWrapper, { props: { activeId: 'projects/active' } });

    const subItem = screen.getByRole('button', { name: /^active/i });
    const classes = Array.from(subItem.classList);

    expect(classes).toContain('text-jam-text');
    expect(classes).not.toContain('text-jam-soft');
  });

  it('separator usa role="separator" implícito via <hr>', () => {
    const { container } = render(SidebarTestWrapper);
    const hr = container.querySelector('hr[data-jam-sidebar-separator]');
    expect(hr).toBeTruthy();
    expect(hr?.getAttribute('aria-orientation')).toBe('horizontal');
  });
});
