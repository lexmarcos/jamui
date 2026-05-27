import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from './DatePicker.svelte';

function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

async function openCalendar() {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /abrir calendario/i }));
  await screen.findByRole('dialog');
  return user;
}

describe('DatePicker', () => {
  it('abre o calendario ao clicar no trigger', async () => {
    render(DatePicker, { label: 'Data' });

    await openCalendar();

    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('seleciona uma data e chama onChange', async () => {
    const onChange = vi.fn();
    render(DatePicker, {
      label: 'Data',
      locale: 'en-US',
      onChange,
      value: new Date(2026, 4, 1)
    });

    const user = await openCalendar();
    await user.click(screen.getByRole('button', { name: /2026-05-15/ }));

    expect((screen.getByRole('combobox', { name: 'Data' }) as HTMLInputElement).value).toBe('15/05/2026');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(toISODate(onChange.mock.calls[0][0])).toBe('2026-05-15');
  });

  it('respeita minDate e maxDate', async () => {
    const onChange = vi.fn();
    render(DatePicker, {
      label: 'Data',
      locale: 'en-US',
      maxDate: new Date(2026, 4, 20),
      minDate: new Date(2026, 4, 10),
      onChange,
      value: new Date(2026, 4, 15)
    });

    const user = await openCalendar();
    const beforeMin = screen.getByRole('button', { name: /2026-05-09/ });
    const afterMax = screen.getByRole('button', { name: /2026-05-21/ });
    const insideRange = screen.getByRole('button', { name: /2026-05-20/ });

    expect(beforeMin.getAttribute('aria-disabled')).toBe('true');
    expect(afterMax.getAttribute('aria-disabled')).toBe('true');
    expect(insideRange.getAttribute('aria-disabled')).toBeNull();

    await user.click(beforeMin);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('impede selecao de datas desabilitadas por funcao customizada', async () => {
    const onChange = vi.fn();
    render(DatePicker, {
      isDateDisabled: (date: Date) => date.getDate() === 15,
      label: 'Data',
      locale: 'en-US',
      onChange,
      value: new Date(2026, 4, 1)
    });

    const user = await openCalendar();
    const disabledDay = screen.getByRole('button', { name: /2026-05-15/ });

    expect(disabledDay.getAttribute('aria-disabled')).toBe('true');
    await user.click(disabledDay);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('fecha com Esc', async () => {
    render(DatePicker, { label: 'Data' });
    const user = await openCalendar();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('fecha ao clicar fora', async () => {
    render(DatePicker, { label: 'Data' });
    const user = await openCalendar();

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('aplica estado desabilitado', async () => {
    const user = userEvent.setup();
    render(DatePicker, { disabled: true, label: 'Data' });

    expect((screen.getByRole('combobox', { name: 'Data' }) as HTMLInputElement).disabled).toBe(true);

    await user.click(screen.getByRole('button', { name: /abrir calendario/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('aplica estado de erro', () => {
    render(DatePicker, { error: 'Data obrigatoria.', label: 'Data' });

    expect(screen.getByRole('combobox', { name: 'Data' }).getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByText('Data obrigatoria.')).toBeTruthy();
  });

  it('associa label, helper text, erro e aria-describedby corretamente', () => {
    render(DatePicker, {
      error: 'Data obrigatoria.',
      helperText: 'Escolha uma data valida.',
      label: 'Data'
    });

    const input = screen.getByLabelText('Data');
    const helper = screen.getByText('Escolha uma data valida.');
    const error = screen.getByText('Data obrigatoria.');
    const describedBy = input.getAttribute('aria-describedby') ?? '';

    expect(describedBy).toContain(helper.id);
    expect(describedBy).toContain(error.id);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('seleciona intervalo com mode range', async () => {
    const onChange = vi.fn();
    render(DatePicker, {
      label: 'Periodo',
      locale: 'en-US',
      mode: 'range',
      onChange,
      value: { start: '2026-05-10', end: null }
    });

    const user = await openCalendar();
    await user.click(screen.getByRole('button', { name: /2026-05-15/ }));

    const finalValue = onChange.mock.calls[0][0];
    expect((screen.getByRole('combobox', { name: 'Periodo' }) as HTMLInputElement).value).toBe('10/05/2026 - 15/05/2026');
    expect(toISODate(finalValue.start)).toBe('2026-05-10');
    expect(toISODate(finalValue.end)).toBe('2026-05-15');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  it('impede intervalo contendo data desabilitada', async () => {
    const onChange = vi.fn();
    render(DatePicker, {
      isDateDisabled: (date: Date) => date.getDate() === 12,
      label: 'Periodo',
      locale: 'en-US',
      mode: 'range',
      onChange,
      value: { start: '2026-05-10', end: null }
    });

    const user = await openCalendar();
    await user.click(screen.getByRole('button', { name: /2026-05-15/ }));

    expect(onChange).not.toHaveBeenCalled();
    expect((screen.getByRole('combobox', { name: 'Periodo' }) as HTMLInputElement).value).toBe('10/05/2026 - ');
    expect(screen.getByRole('dialog')).toBeTruthy();
  });
});
