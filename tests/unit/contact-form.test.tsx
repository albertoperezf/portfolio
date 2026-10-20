// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '@/components/contact-form';
import { en } from '@/i18n/dictionaries/en';
import type { ContactState } from '@/lib/contact/schema';

const submitContact = vi.hoisted(() => vi.fn());
vi.mock('@/actions/contact', () => ({ submitContact }));

describe('ContactForm', () => {
  beforeEach(() => submitContact.mockReset());

  it('labels every field and marks required ones', () => {
    render(<ContactForm copy={en.contact.form} locale="en" />);
    expect(screen.getByRole('textbox', { name: /Name/ })).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByRole('textbox', { name: /Email/ })).toHaveAccessibleDescription(
      'I’ll only use it to reply to you.',
    );
    expect(screen.getByRole('textbox', { name: /Message/ })).toBeRequired();
    expect(screen.queryByRole('textbox', { name: en.contact.form.honeypot })).not.toBeInTheDocument();
  });

  it('shows a focused error summary linked to invalid fields and keeps the values', async () => {
    submitContact.mockResolvedValue({
      status: 'error',
      attempt: 1,
      fieldErrors: { email: 'invalid', message: 'tooShort' },
      values: { name: 'Jane', email: 'jane@', message: 'Hi' },
    } satisfies ContactState);
    render(<ContactForm copy={en.contact.form} locale="en" />);

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const summary = await screen.findByRole('alert');
    expect(summary).toHaveFocus();
    expect(screen.getByRole('link', { name: en.contact.form.errors.email.invalid })).toHaveAttribute('href', '#email');
    const email = screen.getByRole('textbox', { name: /Email/ });
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription(
      `I’ll only use it to reply to you. ${en.contact.form.errors.email.invalid}`,
    );
    expect(screen.getByRole('textbox', { name: /Name/ })).toHaveValue('Jane');
    expect(screen.getByRole('textbox', { name: /Name/ })).not.toHaveAttribute('aria-invalid');
  });

  it('shows a server error in the summary', async () => {
    submitContact.mockResolvedValue({ status: 'error', attempt: 1, formError: 'server', values: {} });
    render(<ContactForm copy={en.contact.form} locale="en" />);
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(en.contact.form.serverError);
  });

  it('replaces the form with a focused confirmation on success', async () => {
    submitContact.mockResolvedValue({ status: 'success', attempt: 1 });
    render(<ContactForm copy={en.contact.form} locale="en" />);
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const heading = await screen.findByRole('heading', { name: en.contact.form.successTitle });
    expect(heading).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Send message' })).not.toBeInTheDocument();
  });
});
