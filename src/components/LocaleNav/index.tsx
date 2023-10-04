import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LocaleNav(): JSX.Element {
  const t = useTranslations("Navigation");

  return (
    <div>
      <Link href="/es" locale={false}>
        {t("es")}
      </Link>

      <Link href="/" locale={false}>
        {t("en")}
      </Link>
    </div>
  );
}
