import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateContact } from '@/lib/contact/schema';
import { sendContactEmail, verifyTurnstile } from '@/lib/contact/send';

describe('validateContact', () => {
  const valid = { name: 'Jane', email: 'jane@example.com', message: 'Hello, nice portfolio!' };

  it('accepts and trims valid input', () => {
    expect(validateContact({ ...valid, name: '  Jane  ' })).toEqual({ ok: true, data: valid });
  });

  it.each([
    [{ name: '' }, { name: 'required' }],
    [{ name: 'x'.repeat(101) }, { name: 'tooLong' }],
    [{ email: '' }, { email: 'required' }],
    [{ email: 'nope' }, { email: 'invalid' }],
    [{ message: '   ' }, { message: 'required' }],
    [{ message: 'short' }, { message: 'tooShort' }],
    [{ message: 'x'.repeat(5001) }, { message: 'tooLong' }],
  ])('%o → %o', (override, fieldErrors) => {
    expect(validateContact({ ...valid, ...override })).toEqual({ ok: false, fieldErrors });
  });
});

describe('sendContactEmail', () => {
  const input = { name: 'Jane\nBcc: x', email: 'jane@example.com', message: 'Hello there, Alberto!' };

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('CONTACT_DRY_RUN', '');
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('CONTACT_TO_EMAIL', 'owner@example.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('sends a plain-text email with reply-to and a single-line subject', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(sendContactEmail(input)).resolves.toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init.body);
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer re_test');
    expect(body).toMatchObject({ to: ['owner@example.com'], reply_to: 'jane@example.com' });
    expect(body.subject).not.toMatch(/[\r\n]/);
    expect(body.html).toBeUndefined();
  });

  it('fails when Resend rejects the request', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 422 })));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(sendContactEmail(input)).resolves.toBe(false);
  });

  it('fails in production when not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(sendContactEmail(input)).resolves.toBe(false);
  });

  it('does not call Resend in dry-run mode', async () => {
    vi.stubEnv('CONTACT_DRY_RUN', '1');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'info').mockImplementation(() => {});
    await expect(sendContactEmail(input)).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('verifyTurnstile', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('is skipped when no secret is configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    await expect(verifyTurnstile(null, null)).resolves.toBe(true);
  });

  it('requires a token when configured', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
    await expect(verifyTurnstile(null, null)).resolves.toBe(false);
  });

  it('returns the siteverify result', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'secret');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ success: true })));
    await expect(verifyTurnstile('token', '1.2.3.4')).resolves.toBe(true);
  });
});
