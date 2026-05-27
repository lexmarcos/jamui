import type { Meta, StoryObj } from '@storybook/sveltekit';

import DatePickerPreview from './DatePickerPreview.svelte';
import DatePickerVariantsPreview from './DatePickerVariantsPreview.svelte';

const meta = {
  title: 'Components/DatePicker',
  component: DatePickerPreview,
  args: {
    clearable: false,
    disabled: false,
    error: '',
    helperText: 'Use o calendario ou digite no formato dd/mm/aaaa.',
    label: 'Data de entrega',
    mode: 'single',
    placeholder: 'dd/mm/aaaa',
    readOnly: false,
    required: false,
    size: 'md',
    value: null,
    variant: 'default'
  },
  argTypes: {
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    maxDate: { control: 'text' },
    minDate: { control: 'text' },
    mode: {
      control: 'inline-radio',
      options: ['single', 'range']
    },
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg']
    },
    value: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'filled', 'outline', 'ghost']
    }
  }
} satisfies Meta<typeof DatePickerPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Examples: StoryObj = {
  render: () => ({
    Component: DatePickerVariantsPreview
  })
};

export const Basic: Story = {
  args: {
    helperText: '',
    label: 'Data'
  }
};

export const WithHelperText: Story = {
  args: {
    helperText: 'A data sera usada para agendamento.'
  }
};

export const Error: Story = {
  args: {
    error: 'Data obrigatoria.',
    helperText: '',
    required: true
  }
};

export const MinMax: Story = {
  args: {
    helperText: 'Permitido de 10/05/2026 a 25/05/2026.',
    maxDate: '2026-05-25',
    minDate: '2026-05-10',
    value: '2026-05-15'
  }
};

export const Range: Story = {
  args: {
    clearable: true,
    helperText: 'Selecione a data inicial e final.',
    label: 'Periodo',
    mode: 'range',
    placeholder: 'inicio - fim',
    value: {
      start: '2026-05-10',
      end: '2026-05-15'
    }
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '2026-05-15'
  }
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '2026-05-15'
  }
};

export const Clearable: Story = {
  args: {
    clearable: true,
    value: '2026-05-15'
  }
};

export const Small: Story = {
  args: {
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    size: 'lg'
  }
};
