'use server';

import { headers } from 'next/headers';
import { sendContactEmail, verifyTurnstile } from '@/lib/contact/send';
import { validateContact, type ContactState } from '@/lib/contact/schema';

export async function submitContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const values = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  // Bots fill every field; pretend it worked so they don't retry.
  if (String(formData.get('company') ?? '') !== '') return { status: 'success', attempt };

  const result = validateContact(values);
  if (!result.ok) return { status: 'error', attempt, fieldErrors: result.fieldErrors, values };

  const requestHeaders = await headers();
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  const human = await verifyTurnstile(formData.get('cf-turnstile-response') as string | null, ip);
  if (!human) return { status: 'error', attempt, formError: 'captcha', values };

  const sent = await sendContactEmail(result.data);
  if (!sent) return { status: 'error', attempt, formError: 'server', values };

  return { status: 'success', attempt };
}
