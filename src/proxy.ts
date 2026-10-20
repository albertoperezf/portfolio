import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, isLocale } from '@/i18n/config';
import { resolveLocale } from '@/i18n/negotiate';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (isLocale(first)) return NextResponse.next();

  const locale = resolveLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;

  const response = NextResponse.redirect(url);
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|api|sitemap\\.xml|robots\\.txt|icon|apple-icon|manifest\\.webmanifest|.*\\.(?:svg|png|jpe?g|webp|avif|ico|txt|xml)$).*)',
  ],
};
