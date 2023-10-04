import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
