import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "@/styles/Home.module.css";

export default function LocaleNav(): JSX.Element {
  const t = useTranslations("Navigation");

  return (
    <div className={styles.locale}>
      <Link href="/es" locale={false}>
        {t("es")}
      </Link>
      |
      <Link href="/" locale={false}>
        {t("en")}
      </Link>
    </div>
  );
}
