import { PageTransition } from '@/components/page-transition';

// Templates remount on every navigation, so the page transition can run enter/exit animations here.
export default function StaticTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
