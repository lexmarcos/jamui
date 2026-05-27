<script lang="ts">
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';
  import AccordionTrigger from './AccordionTrigger.svelte';
  import AccordionContent from './AccordionContent.svelte';
  import type { AccordionProps } from './accordion';

  let {
    type = 'single',
    collapsible = false,
    disabled = false,
    variant = 'default',
    size = 'md',
    defaultValue,
    value,
    onValueChange,
    onFirstTriggerClick
  }: Partial<AccordionProps> & {
    onFirstTriggerClick?: (e: MouseEvent) => void;
  } = $props();
</script>

<Accordion {type} {collapsible} {disabled} {variant} {size} {defaultValue} {value} {onValueChange}>
  <AccordionItem value="item-1">
    <AccordionTrigger onclick={onFirstTriggerClick}>Item 1</AccordionTrigger>
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
