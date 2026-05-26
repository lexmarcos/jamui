<script lang="ts">
  import Alert from '../lib/components/Alert.svelte';
  import type { AlertVariant } from '../lib/components/alert';

  type AlertPreviewProps = {
    description?: string;
    dismissible?: boolean;
    title?: string;
    variant?: AlertVariant;
    visible?: boolean;
  };

  let {
    description = 'Sua sessao expira em 5 minutos. Salve seu trabalho.',
    dismissible = false,
    title = 'Atencao',
    variant = 'info',
    visible = true
  }: AlertPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 20rem; max-width: 36rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Alert {description} {dismissible} {title} {variant} bind:visible />
</div>
