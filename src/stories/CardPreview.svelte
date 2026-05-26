<script lang="ts">
  import { Card, CardHeader, CardBody, CardFooter, Button } from '../lib';
  import type { CardVariant } from '../lib/components/card';

  type CardPreviewProps = {
    variant?: CardVariant;
  };

  let { variant = 'default' }: CardPreviewProps = $props();

  const labelColor = $derived(variant === 'filled' ? 'text-jam-bg/60' : 'text-jam-muted');
  const titleColor = $derived(variant === 'filled' ? 'text-jam-bg' : 'text-jam-text');
  const bodyColor = $derived(variant === 'filled' ? 'text-jam-bg/70' : 'text-jam-muted');
  const metaColor = $derived(variant === 'filled' ? 'text-jam-bg/60' : 'text-jam-soft');
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Card {variant} class="max-w-sm">
    <CardHeader>
      <p class="text-[10px] font-black uppercase tracking-[0.18em] {labelColor}">
        Servidor 001
      </p>
    </CardHeader>
    <CardBody>
      <h3 class="mb-2 text-sm font-black uppercase tracking-[0.16em] {titleColor}">
        Alpha Node
      </h3>
      <p class="text-xs font-medium leading-relaxed {bodyColor}">
        Instancia ativa em regiao us-east-1. Latencia media 24ms. Uptime 99.97%.
      </p>
    </CardBody>
    <CardFooter>
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-black uppercase tracking-[0.12em] {metaColor}">
          CPU 12%
        </span>
        <Button size="sm" variant={variant === 'filled' ? 'primary' : 'secondary'}>
          Detalhes
        </Button>
      </div>
    </CardFooter>
  </Card>
</div>
