import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Separator from './Separator.svelte';

describe('Separator', () => {
  it('renderiza corretamente', () => {
    render(Separator);
    const el = screen.getByRole('separator');
    expect(el).toBeTruthy();
  });

  it('aplica orientacao horizontal por padrao', () => {
    render(Separator);
    const el = screen.getByRole('separator');
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');
    expect(el.classList.contains('w-full')).toBe(true);
  });

  it('aplica orientacao vertical', () => {
    render(Separator, { orientation: 'vertical' });
    const el = screen.getByRole('separator');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
    expect(el.classList.contains('self-stretch')).toBe(true);
  });

  it('aplica variante default por padrao', () => {
    render(Separator);
    const el = screen.getByRole('separator');
    expect(el.classList.contains('bg-jam-text/15')).toBe(true);
  });

  it('aplica variante muted', () => {
    render(Separator, { variant: 'muted' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('bg-jam-text/8')).toBe(true);
  });

  it('aplica variante strong', () => {
    render(Separator, { variant: 'strong' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('bg-jam-text/30')).toBe(true);
  });

  it('aplica variante dashed horizontal', () => {
    render(Separator, { variant: 'dashed' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('border-dashed')).toBe(true);
    expect(el.classList.contains('h-0')).toBe(true);
  });

  it('aplica variante dotted horizontal', () => {
    render(Separator, { variant: 'dotted' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('border-dotted')).toBe(true);
  });

  it('aplica variante dashed vertical', () => {
    render(Separator, { orientation: 'vertical', variant: 'dashed' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('border-l')).toBe(true);
    expect(el.classList.contains('border-dashed')).toBe(true);
  });

  it('aplica tamanho sm', () => {
    render(Separator, { size: 'sm' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('h-px')).toBe(true);
  });

  it('aplica tamanho md', () => {
    render(Separator, { size: 'md' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('h-0.5')).toBe(true);
  });

  it('aplica tamanho lg', () => {
    render(Separator, { size: 'lg' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('h-1')).toBe(true);
  });

  it('aplica role="separator" quando semantico', () => {
    render(Separator, { decorative: false });
    const el = screen.getByRole('separator');
    expect(el).toBeTruthy();
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');
    expect(el.getAttribute('aria-hidden')).toBeNull();
  });

  it('aplica aria-hidden quando decorativo', () => {
    render(Separator, { decorative: true });
    const el = document.querySelector('[aria-hidden="true"]');
    expect(el).toBeTruthy();
    expect(el?.getAttribute('aria-orientation')).toBeNull();
    expect(el?.getAttribute('role')).toBeNull();
  });

  it('aplica aria-orientation vertical', () => {
    render(Separator, { orientation: 'vertical' });
    const el = screen.getByRole('separator');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('aplica classes customizadas', () => {
    render(Separator, { class: 'my-8' });
    const el = screen.getByRole('separator');
    expect(el.classList.contains('my-8')).toBe(true);
  });
});
