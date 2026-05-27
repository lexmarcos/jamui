<script lang="ts">
  import { untrack } from 'svelte';
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';
  import AccordionTrigger from './AccordionTrigger.svelte';
  import AccordionContent from './AccordionContent.svelte';
  import type { AccordionType } from './accordion';

  let {
    type = 'single',
    initialValue = ''
  }: {
    type?: AccordionType;
    initialValue?: string | string[];
  } = $props();

  let boundValue = $state<string | string[]>(untrack(() => initialValue));
  const valueLabel = $derived(Array.isArray(boundValue) ? boundValue.join(',') : boundValue);
</script>

<div data-testid="bound-value">{valueLabel}</div>

<Accordion {type} bind:value={boundValue} collapsible={true}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Item 3</AccordionTrigger>
    <AccordionContent>Content 3</AccordionContent>
  </AccordionItem>
</Accordion>
