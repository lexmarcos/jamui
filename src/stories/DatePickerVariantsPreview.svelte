<script lang="ts">
  import { DatePicker } from '../lib';

  const minDate = new Date(2026, 4, 10);
  const maxDate = new Date(2026, 4, 25);
</script>

<div
  class="jamui-root"
  style="min-width: 28rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 2rem;"
>
  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Basico</p>
    <DatePicker label="Data" placeholder="dd/mm/aaaa" />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Label + Helper</p>
    <DatePicker label="Entrega" helperText="Escolha uma data util para entrega." />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Erro</p>
    <DatePicker label="Vencimento" error="Informe uma data valida." required />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Data minima + maxima</p>
    <DatePicker label="Janela" value={new Date(2026, 4, 15)} {minDate} {maxDate} helperText="Permitido de 10/05/2026 a 25/05/2026." />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Range</p>
    <DatePicker
      label="Periodo"
      mode="range"
      clearable
      value={{ start: new Date(2026, 4, 10), end: new Date(2026, 4, 15) }}
      helperText="Clique na data inicial e depois na data final."
    />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Desabilitado</p>
    <DatePicker label="Data" value={new Date(2026, 4, 15)} disabled />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Somente leitura</p>
    <DatePicker label="Data" value={new Date(2026, 4, 15)} readOnly />
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Limpar selecao</p>
    <DatePicker label="Data" value={new Date(2026, 4, 15)} clearable />
  </div>

  <div class="grid gap-3">
    <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Tamanhos</p>
    <DatePicker label="Small" size="sm" value={new Date(2026, 4, 15)} />
    <DatePicker label="Medium" size="md" value={new Date(2026, 4, 15)} />
    <DatePicker label="Large" size="lg" value={new Date(2026, 4, 15)} />
  </div>

  <div class="grid gap-3">
    <p class="text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Variantes</p>
    <DatePicker label="Default" variant="default" value={new Date(2026, 4, 15)} />
    <DatePicker label="Filled" variant="filled" value={new Date(2026, 4, 15)} />
    <DatePicker label="Outline" variant="outline" value={new Date(2026, 4, 15)} />
    <DatePicker label="Ghost" variant="ghost" value={new Date(2026, 4, 15)} />
  </div>
</div>
