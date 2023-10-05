import { NextIntlClientProvider } from "next-intl";
import messages from "../../messages/en-US.json";

export default function NextIntlJestProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <NextIntlClientProvider messages={messages} locale="en-US">
      {children}
    </NextIntlClientProvider>
  );
}
