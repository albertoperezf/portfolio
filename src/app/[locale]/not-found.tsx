import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import { localizedPath } from '@/lib/site';

export default async function NotFound() {
  const { locale, t } = await getDictionary();

  return (
    <>
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter">
        {t.notFound.title}
      </h1>
      <p className="mt-6 text-lg text-muted">{t.notFound.body}</p>
      <Link href={localizedPath(locale, '/')} className="link mt-8 inline-block font-medium">
        {t.notFound.home}
      </Link>
    </>
  );
}
