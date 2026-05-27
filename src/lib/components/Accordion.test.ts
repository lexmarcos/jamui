import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AccordionBindTestWrapper from './AccordionBindTestWrapper.svelte';
import AccordionTestWrapper from './AccordionTestWrapper.svelte';

describe('Accordion', () => {
  it('renderiza todos os itens', () => {
    render(AccordionTestWrapper);

    expect(screen.getByRole('button', { name: /item 1/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /item 2/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /item 3/i })).toBeTruthy();
  });

  it('abre um item ao clicar no trigger', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper);

    const trigger = screen.getByRole('button', { name: /item 1/i });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 1')).toBeTruthy();
  });

  it('fecha um item aberto ao clicar novamente', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, { props: { collapsible: true } });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('mantém apenas um item aberto no modo single', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, { props: { type: 'single' } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });

    await user.click(trigger1);
    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger2.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger2);
    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('permite múltiplos itens abertos no modo multiple', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, { props: { type: 'multiple' } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });

    await user.click(trigger1);
    await user.click(trigger2);

    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 1')).toBeTruthy();
    expect(screen.getByText('Content 2')).toBeTruthy();
  });

  it('chama onValueChange ao abrir um item', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(AccordionTestWrapper, { props: { type: 'single', onValueChange } });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);

    expect(onValueChange).toHaveBeenCalledWith('item-1');
  });

  it('chama onValueChange com array no modo multiple', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(AccordionTestWrapper, { props: { type: 'multiple', onValueChange } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });

    await user.click(trigger1);
    expect(onValueChange).toHaveBeenCalledWith(['item-1']);

    await user.click(trigger2);
    expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2']);
  });

  it('aplica aria-controls corretamente', () => {
    render(AccordionTestWrapper);

    const trigger = screen.getByRole('button', { name: /item 1/i });
    const controlsId = trigger.getAttribute('aria-controls');

    expect(controlsId).toBeTruthy();
    expect(controlsId).toContain('accordion-content');
  });

  it('aplica aria-labelledby no conteúdo', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper);

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);

    const content = screen.getByText('Content 1').closest('[role="region"]');
    expect(content).toBeTruthy();
    expect(content?.getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('suporta defaultValue', () => {
    render(AccordionTestWrapper, { props: { type: 'single', defaultValue: 'item-2' } });

    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 2')).toBeTruthy();
  });

  it('suporta defaultValue como array no modo multiple', () => {
    render(AccordionTestWrapper, { props: { type: 'multiple', defaultValue: ['item-1', 'item-3'] } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger3 = screen.getByRole('button', { name: /item 3/i });

    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger3.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 1')).toBeTruthy();
    expect(screen.getByText('Content 3')).toBeTruthy();
  });

  it('normaliza defaultValue array para apenas um item no modo single', () => {
    render(AccordionTestWrapper, { props: { type: 'single', defaultValue: ['item-1', 'item-3'] } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger3 = screen.getByRole('button', { name: /item 3/i });

    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger3.getAttribute('aria-expanded')).toBe('false');
  });

  it('atualiza bind:value no modo single', async () => {
    const user = userEvent.setup();
    render(AccordionBindTestWrapper, { props: { type: 'single', initialValue: '' } });

    await user.click(screen.getByRole('button', { name: /item 2/i }));

    expect(screen.getByTestId('bound-value').textContent).toBe('item-2');
  });

  it('atualiza bind:value no modo multiple', async () => {
    const user = userEvent.setup();
    render(AccordionBindTestWrapper, { props: { type: 'multiple', initialValue: [] } });

    await user.click(screen.getByRole('button', { name: /item 1/i }));
    await user.click(screen.getByRole('button', { name: /item 3/i }));

    expect(screen.getByTestId('bound-value').textContent).toBe('item-1,item-3');
  });

  it('compõe onclick do trigger antes de alternar o item', async () => {
    const user = userEvent.setup();
    const onFirstTriggerClick = vi.fn();
    render(AccordionTestWrapper, { props: { onFirstTriggerClick } });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);

    expect(onFirstTriggerClick).toHaveBeenCalledOnce();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('respeita preventDefault no onclick do trigger', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, {
      props: {
        onFirstTriggerClick: (e: MouseEvent) => e.preventDefault()
      }
    });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('move foco entre triggers com setas, Home e End', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper);

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    const trigger3 = screen.getByRole('button', { name: /item 3/i });

    trigger1.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(trigger2);

    await user.keyboard('{End}');
    expect(document.activeElement).toBe(trigger3);

    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(trigger1);

    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(trigger1);
  });

  it('aplica variantes visuais', () => {
    const { container } = render(AccordionTestWrapper, { props: { variant: 'bordered' } });

    const item = container.querySelector('.jam-accordion-item');
    expect(item?.classList.contains('border')).toBe(true);
  });

  it('aplica tamanhos diferentes', () => {
    render(AccordionTestWrapper, { props: { size: 'lg' } });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    expect(trigger.className).toContain('px-5');
    expect(trigger.className).toContain('py-4');
  });

  it('desabilita todos os itens quando Accordion está desabilitado', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, { props: { disabled: true } });

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });

    expect(trigger1.getAttribute('disabled')).not.toBeNull();
    expect(trigger2.getAttribute('disabled')).not.toBeNull();

    await user.click(trigger1);
    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
  });

  it('não fecha item no modo single sem collapsible', async () => {
    const user = userEvent.setup();
    render(AccordionTestWrapper, { props: { type: 'single', collapsible: false } });

    const trigger = screen.getByRole('button', { name: /item 1/i });
    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
