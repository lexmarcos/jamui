<script lang="ts">
  import Textarea from '../lib/components/Textarea.svelte';
</script>

<div
  class="jamui-root"
  style="min-width: 28rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 2.5rem;"
>
  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Default</span>
    <Textarea
      label="Descricao"
      hint="Descreva sua experiencia em detalhes."
      placeholder="Digite aqui..."
      maxLength={280}
      showCounter={true}
    />
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Sizes</span>
    <div class="grid gap-4">
      <Textarea
        label="Small"
        size="sm"
        rows={3}
        placeholder="Small textarea"
      />
      <Textarea
        label="Medium (default)"
        size="md"
        rows={3}
        placeholder="Medium textarea"
      />
      <Textarea
        label="Large"
        size="lg"
        rows={3}
        placeholder="Large textarea"
      />
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">States</span>
    <div class="grid gap-4">
      <Textarea
        label="With Error"
        error="Este campo e obrigatorio."
        value=""
        placeholder="Campo obrigatorio"
      />
      <Textarea
        label="Disabled"
        disabled={true}
        value="Este campo esta desabilitado."
      />
      <Textarea
        label="Filled"
        hint="Campo preenchido com sucesso."
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Resize Behavior</span>
    <div class="grid gap-4">
      <Textarea
        label="No Resize"
        resize="none"
        rows={3}
        placeholder="Cannot resize"
      />
      <Textarea
        label="Vertical Only (default)"
        resize="vertical"
        rows={3}
        placeholder="Resize vertically"
      />
      <Textarea
        label="Horizontal Only"
        resize="horizontal"
        rows={3}
        placeholder="Resize horizontally"
      />
      <Textarea
        label="Both Directions"
        resize="both"
        rows={3}
        placeholder="Resize both ways"
      />
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Character Counter</span>
    <div class="grid gap-4">
      <Textarea
        label="With Counter"
        maxLength={100}
        showCounter={true}
        value="Texto de exemplo"
        hint="Contador de caracteres ativo"
      />
      <Textarea
        label="Over Limit"
        maxLength={20}
        showCounter={true}
        value="Este texto excede o limite maximo permitido"
      />
      <Textarea
        label="No Counter"
        maxLength={100}
        showCounter={false}
        value="Contador oculto"
        hint="maxLength definido mas contador desativado"
      />
    </div>
  </div>

  <div class="grid gap-3">
    <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-jam-muted">Row Variants</span>
    <div class="grid gap-4">
      <Textarea
        label="2 Rows"
        rows={2}
        placeholder="Compact textarea"
      />
      <Textarea
        label="6 Rows"
        rows={6}
        placeholder="Tall textarea"
      />
      <Textarea
        label="10 Rows"
        rows={10}
        placeholder="Very tall textarea"
      />
    </div>
  </div>
</div>
