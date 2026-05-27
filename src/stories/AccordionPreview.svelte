<script lang="ts">
  import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../lib';

  let {
    type = 'single',
    variant = 'default',
    size = 'md'
  }: {
    type?: 'single' | 'multiple';
    variant?: 'default' | 'bordered' | 'separated' | 'filled' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  } = $props();
</script>

<div class="jamui-root min-h-screen bg-jam-bg p-8">
  <div class="mx-auto max-w-2xl">
    <Accordion {type} {variant} {size}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with the JamUI design system and matches the monospace, high-contrast aesthetic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default with smooth transitions, but you can disable it if needed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</div>
