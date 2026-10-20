import 'server-only';
import type { ContactInput } from './schema';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TURNSTILE_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token: string | null, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);
  try {
    const res = await fetch(TURNSTILE_ENDPOINT, { method: 'POST', body, signal: AbortSignal.timeout(5000) });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

/** Sends the message as plain text (no HTML, so user input can't inject markup). */
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (process.env.CONTACT_DRY_RUN === '1' || (!apiKey && process.env.NODE_ENV !== 'production')) {
    console.info('[contact] dry run, message not sent:', { from: input.email, length: input.message.length });
    return true;
  }
  if (!apiKey || !to) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured');
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Without a verified domain Resend only allows its shared sender, delivering to the account owner.
        from: 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: input.email,
        subject: singleLine(`Portfolio: message from ${input.name}`),
        text: `${input.name} <${input.email}> wrote:\n\n${input.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error('[contact] Resend responded with', res.status);
    return res.ok;
  } catch (error) {
    console.error('[contact] Resend request failed', error);
    return false;
  }
}
