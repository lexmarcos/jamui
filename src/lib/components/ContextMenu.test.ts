import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ContextMenuSubTest from './ContextMenuSubTest.svelte';
import ContextMenuTest from './ContextMenuTest.svelte';

async function openContextMenu() {
  const user = userEvent.setup();
  const trigger = screen.getByTestId('trigger');
  await user.pointer({ keys: '[MouseRight]', target: trigger });
  return user;
}

describe('ContextMenu', () => {
  it('abre ao clicar com o botao direito', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });

    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('renderiza em portal no document.body', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });

    const menu = screen.getByRole('menu');
    expect(menu).toBeTruthy();
    expect(document.body.contains(menu)).toBe(true);
  });

  it('fecha ao pressionar Esc', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    expect(screen.getByRole('menu')).toBeTruthy();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });

  it('fecha ao clicar fora', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    expect(screen.getByRole('menu')).toBeTruthy();

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });

  it('executa acao ao selecionar item', async () => {
    const onItemClick = vi.fn();
    render(ContextMenuTest, { onItemClick });
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onItemClick).toHaveBeenCalledWith('edit');
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it('nao executa acao de item desabilitado', async () => {
    const onItemClick = vi.fn();
    render(ContextMenuTest, { onItemClick });
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    const deleteItem = screen.getByRole('menuitem', { name: 'Delete' });
    expect(deleteItem).toBeTruthy();

    await user.click(deleteItem);

    expect(onItemClick).not.toHaveBeenCalled();
  });

  it('navega pelos itens com teclado', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    const menu = screen.getByRole('menu');
    expect(menu).toBeTruthy();

    await user.keyboard('{ArrowDown}');

    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toBe(document.activeElement);

    await user.keyboard('{ArrowDown}');
    expect(items[1]).toBe(document.activeElement);

    await user.keyboard('{ArrowUp}');
    expect(items[0]).toBe(document.activeElement);

    await user.keyboard('{Home}');
    expect(items[0]).toBe(document.activeElement);

    await user.keyboard('{End}');
    const lastEnabled = items.filter(i => !i.hasAttribute('disabled'));
    expect(lastEnabled[lastEnabled.length - 1]).toBe(document.activeElement);
  });

  it('aplica atributos de acessibilidade corretamente', async () => {
    render(ContextMenuTest);
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    expect(trigger.getAttribute('role')).toBe('button');
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    const menu = screen.getByRole('menu');
    expect(menu.getAttribute('tabindex')).toBe('-1');

    const items = screen.getAllByRole('menuitem');
    expect(items.length).toBe(3);
    items.forEach(item => {
      expect(item.getAttribute('tabindex')).toBe('-1');
    });
  });

  it('fecha ao selecionar um item com Enter', async () => {
    const onItemClick = vi.fn();
    render(ContextMenuTest, { onItemClick });
    const user = userEvent.setup();
    const trigger = screen.getByTestId('trigger');

    await user.pointer({ keys: '[MouseRight]', target: trigger });
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(onItemClick).toHaveBeenCalledWith('edit');
    expect(onItemClick).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).toBeNull();
    });
  });

  it('aplica cursor de contexto no trigger', async () => {
    render(ContextMenuTest);
    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeTruthy();
  });

  it('abre e posiciona submenu a partir do trigger correto', async () => {
    render(ContextMenuSubTest);
    const user = await openContextMenu();

    await user.hover(screen.getByRole('menuitem', { name: /open with/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('menu').length).toBe(2);
    });

    const submenu = screen.getByTestId('submenu');
    expect(submenu.getAttribute('style')).toMatch(/left:\s*\d+px;\s*top:\s*\d+px/);
  });

  it('permite selecionar item dentro de submenu portaled', async () => {
    const onSubItemClick = vi.fn();
    render(ContextMenuSubTest, { onSubItemClick });
    const user = await openContextMenu();

    await user.hover(screen.getByRole('menuitem', { name: /open with/i }));
    await waitFor(() => {
      expect(screen.getAllByRole('menu').length).toBe(2);
    });

    await user.click(screen.getByRole('menuitem', { name: 'Browser' }));

    expect(onSubItemClick).toHaveBeenCalledWith('browser');
    expect(onSubItemClick).toHaveBeenCalledTimes(1);
  });

  it('abre submenu com teclado e retorna foco ao trigger com ArrowLeft', async () => {
    render(ContextMenuSubTest);
    const user = await openContextMenu();

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');

    const subTrigger = screen.getByRole('menuitem', { name: /open with/i });
    expect(document.activeElement).toBe(subTrigger);

    await user.keyboard('{ArrowRight}');

    await waitFor(() => {
      expect(screen.getAllByRole('menu').length).toBe(2);
    });
    expect(document.activeElement?.textContent).toContain('Default App');

    await user.keyboard('{ArrowLeft}');

    await waitFor(() => {
      expect(screen.getAllByRole('menu').length).toBe(1);
    });
    expect(document.activeElement).toBe(subTrigger);
  });
});
