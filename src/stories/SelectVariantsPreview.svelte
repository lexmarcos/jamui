<script lang="ts">
  import { Select, SelectOption } from '../lib';
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 2rem;"
>
  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Small</p>
    <Select label="Regiao" size="sm" value="us-east-1">
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
      <SelectOption value="eu-west-1" label="EU West 1" />
    </Select>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Medium</p>
    <Select label="Regiao" size="md" value="eu-west-1">
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
      <SelectOption value="eu-west-1" label="EU West 1" />
    </Select>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Large</p>
    <Select label="Regiao" size="lg" value="us-west-2">
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
      <SelectOption value="eu-west-1" label="EU West 1" />
    </Select>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">With Hint</p>
    <Select label="Regiao" size="md" value="" hint="Escolha a regiao mais proxima.">
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
      <SelectOption value="eu-west-1" label="EU West 1" />
    </Select>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">With Error</p>
    <Select label="Regiao" size="md" value="" error="Regiao obrigatoria.">
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
      <SelectOption value="eu-west-1" label="EU West 1" />
    </Select>
  </div>

  <div>
    <p class="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-jam-muted">Disabled</p>
    <Select label="Regiao" size="md" value="us-east-1" disabled>
      <SelectOption value="us-east-1" label="US East 1" />
      <SelectOption value="us-west-2" label="US West 2" />
    </Select>
  </div>
</div>
