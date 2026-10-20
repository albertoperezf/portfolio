import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, { error: 'required' }).max(100, { error: 'tooLong' }),
  email: z
    .string()
    .trim()
    .min(1, { error: 'required' })
    .max(254, { error: 'tooLong' })
    .pipe(z.email({ error: 'invalid' })),
  message: z
    .string()
    .trim()
    .min(1, { error: 'required' })
    .min(10, { error: 'tooShort' })
    .max(5000, { error: 'tooLong' }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldError = 'required' | 'invalid' | 'tooShort' | 'tooLong';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  /** Increments on every submission so the UI can move focus even if the result repeats. */
  attempt: number;
  fieldErrors?: Partial<Record<ContactField, ContactFieldError>>;
  formError?: 'captcha' | 'server';
  values?: Partial<ContactInput>;
}

export const initialContactState: ContactState = { status: 'idle', attempt: 0 };

export function validateContact(
  raw: Record<keyof ContactInput, unknown>,
): { ok: true; data: ContactInput } | { ok: false; fieldErrors: ContactState['fieldErrors'] } {
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };

  const fieldErrors: ContactState['fieldErrors'] = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    fieldErrors[field] ??= issue.message as ContactFieldError;
  }
  return { ok: false, fieldErrors };
}
