// Every content page must be fully prerendered; the build fails if something makes it request-time.
export const ensureStatic = 'navigation';

export default function StaticLayout({ children }: LayoutProps<'/[locale]'>) {
  return children;
}
