<script lang="ts">
  import Slider from '../lib/components/Slider.svelte';
  import type { SliderVariant } from '../lib/components/slider';

  type SliderPreviewProps = {
    label?: string;
    max?: number;
    min?: number;
    size?: 'sm' | 'md' | 'lg';
    step?: number;
    value?: number;
    variant?: SliderVariant;
  };

  let {
    label = 'Volume',
    max = 100,
    min = 0,
    size = 'md',
    step = 1,
    value = $bindable(42),
    variant = 'default'
  }: SliderPreviewProps = $props();
</script>

<div
  class="jamui-root"
  style="min-width: 24rem; background: var(--color-jam-bg); padding: 2rem;"
>
  <Slider {label} {max} {min} {size} {step} bind:value {variant} />
</div>
