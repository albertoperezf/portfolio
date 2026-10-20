'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitContact } from '@/actions/contact';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { initialContactState, type ContactField } from '@/lib/contact/schema';
import { Turnstile } from './turnstile';

type FormCopy = Dictionary['contact']['form'];

const inputClass =
  'mt-2 block w-full rounded-lg border border-control bg-bg px-4 py-3 text-fg aria-[invalid=true]:border-danger aria-[invalid=true]:border-2';

export function ContactForm({
  copy,
  locale,
  turnstileSiteKey,
}: {
  copy: FormCopy;
  locale: string;
  turnstileSiteKey?: string;
}) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === 'error') summaryRef.current?.focus();
    if (state.status === 'success') successRef.current?.focus();
  }, [state.status, state.attempt]);

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-border p-6 sm:p-8">
        <h2 ref={successRef} tabIndex={-1} className="text-xl font-semibold tracking-tight outline-none">
          {copy.successTitle}
        </h2>
        <p className="mt-3 leading-relaxed text-muted">{copy.successBody}</p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const fieldError = (field: ContactField) => {
    const code = errors[field];
    return code ? (copy.errors[field] as Record<string, string>)[code] : undefined;
  };
  const fields: ContactField[] = ['name', 'email', 'message'];
  const listedErrors = fields.filter((field) => errors[field]);
  const formError =
    state.formError === 'captcha' ? copy.captchaError : state.formError === 'server' ? copy.serverError : undefined;

  const describedBy = (field: ContactField, extra?: string) =>
    [extra, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <form action={formAction} noValidate className="space-y-8">
      {state.status === 'error' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="rounded-2xl border-2 border-danger p-6 outline-none"
        >
          <h2 id="error-summary-title" className="font-semibold">
            {copy.errorSummary}
          </h2>
          <ul className="mt-3 space-y-1">
            {listedErrors.map((field) => (
              <li key={field}>
                <a href={`#${field}`} className="link text-danger">
                  {fieldError(field)}
                </a>
              </li>
            ))}
            {formError && <li className="text-danger">{formError}</li>}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="name" className="font-medium">
          {copy.name} <span className="font-normal text-muted">{copy.required}</span>
        </label>
        {fieldError('name') && (
          <p id="name-error" className="mt-1 text-danger">
            {fieldError('name')}
          </p>
        )}
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          defaultValue={state.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy('name')}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="font-medium">
          {copy.email} <span className="font-normal text-muted">{copy.required}</span>
        </label>
        <p id="email-hint" className="mt-1 text-sm text-muted">
          {copy.emailHint}
        </p>
        {fieldError('email') && (
          <p id="email-error" className="mt-1 text-danger">
            {fieldError('email')}
          </p>
        )}
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          required
          maxLength={254}
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy('email', 'email-hint')}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="font-medium">
          {copy.message} <span className="font-normal text-muted">{copy.required}</span>
        </label>
        {fieldError('message') && (
          <p id="message-error" className="mt-1 text-danger">
            {fieldError('message')}
          </p>
        )}
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          maxLength={5000}
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy('message')}
          className={inputClass}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">{copy.honeypot}</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} locale={locale} resetKey={state.attempt} />}

      <button
        type="submit"
        aria-disabled={pending}
        onClick={(event) => {
          if (pending) event.preventDefault();
        }}
        className="inline-flex min-h-11 items-center rounded-full bg-fg px-6 font-medium text-bg hover:opacity-90 aria-disabled:opacity-70"
      >
        {pending ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
