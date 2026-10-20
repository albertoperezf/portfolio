import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { profile } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { alternatesFor } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.contact.title, alternates: alternatesFor(locale, '/contact') };
}

export default async function ContactPage() {
  const { locale, t } = await getDictionary();
  const [beforeLink, afterLink = ''] = t.contact.intro.split('LinkedIn');

  return (
    <>
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter">
        {t.contact.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">
        {beforeLink}
        <a href={profile.links.linkedin} className="link text-fg">
          LinkedIn
        </a>
        {afterLink}
      </p>
      <div className="mt-12 max-w-xl">
        <ContactForm
          copy={t.contact.form}
          locale={locale}
          turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined}
        />
      </div>
    </>
  );
}
