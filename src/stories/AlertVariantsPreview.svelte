<script lang="ts">
  import Alert from '../lib/components/Alert.svelte';
  import type { AlertVariant } from '../lib/components/alert';

  type AlertVariantsPreviewProps = {
    description?: string;
    dismissible?: boolean;
    title?: string;
    variant?: AlertVariant;
    visible?: boolean;
  };

  let {
    description: _description,
    dismissible: _dismissible,
    title: _title,
    variant: _variant,
    visible: _visible
  }: AlertVariantsPreviewProps = $props();

  const variants: AlertVariant[] = ['info', 'success', 'warning', 'danger'];

  const descriptions: Record<AlertVariant, string> = {
    info: 'Nova atualizacao disponivel. Reinicie para aplicar.',
    success: 'Arquivo enviado com sucesso. Processando em segundo plano.',
    warning: 'Espaco em disco abaixo de 10%. Considere limpar arquivos.',
    danger: 'Falha na conexao. Verifique sua rede e tente novamente.'
  };

  const titles: Record<AlertVariant, string> = {
    info: 'Info',
    success: 'Sucesso',
    warning: 'Aviso',
    danger: 'Erro'
  };
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; max-width: 36rem; background: var(--color-jam-bg); padding: 2rem; display: grid; gap: 1rem;"
>
  {#each variants as v}
    <Alert variant={v} title={titles[v]} description={descriptions[v]} />
  {/each}
</div>
