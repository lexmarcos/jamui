import type { Meta, StoryObj } from '@storybook/sveltekit';

import AlertDialogPreview from './AlertDialogPreview.svelte';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialogPreview,
  args: {
    title: 'DELETE ACCOUNT',
    description: 'This action cannot be undone. Your account and all associated data will be permanently removed.',
    cancelLabel: 'CANCEL',
    actionLabel: 'DELETE',
    open: false
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    cancelLabel: { control: 'text' },
    actionLabel: { control: 'text' },
    open: { control: 'boolean' }
  }
} satisfies Meta<typeof AlertDialogPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ConfirmAction: Story = {
  args: {
    title: 'PUBLISH RELEASE',
    description: 'You are about to publish v2.4.0 to the public registry. This will notify all subscribers.',
    cancelLabel: 'REVIEW',
    actionLabel: 'PUBLISH'
  }
};

export const DestructiveAction: Story = {
  args: {
    title: 'REMOVE MEMBER',
    description: 'Removing this member will revoke all access tokens and API keys immediately. Their active sessions will be terminated.',
    cancelLabel: 'KEEP',
    actionLabel: 'REMOVE'
  }
};

export const SimpleConfirm: Story = {
  args: {
    title: 'SAVE CHANGES',
    description: 'You have unsaved changes. Do you want to save before leaving?',
    cancelLabel: 'DISCARD',
    actionLabel: 'SAVE'
  }
};
