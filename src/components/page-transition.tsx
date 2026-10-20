import { ViewTransition } from 'react';

/** Crossfades page content on client-side navigations (layouts persist, so this lives in each page). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
